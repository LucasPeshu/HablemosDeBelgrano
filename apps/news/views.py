from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from slugify import slugify
from .models import News, ViewCount
from apps.category.models import Category
from .permissions import IsPostAuthorOrReadOnly,AuthorPermission
from .serializers import NewsSerializer, NewsListSerializer
from .pagination import SmallSetPagination, MediumSetPagination, LargeSetPagination
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models.query_utils import Q


class NewsListView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        if News.postobjects.all().exists():

            news = News.postobjects.all().filter(status='published')

            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(news, request)
            serializer = NewsListSerializer(results, many=True)

            return paginator.get_paginated_response({'posts': serializer.data})
        else:
            return Response({'error':'No posts found'}, status=status.HTTP_404_NOT_FOUND)


class ListNewsByCategoryView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        if News.postobjects.all().exists():

            slug = request.query_params.get('slug')
            category = Category.objects.get(slug=slug)
            
            posts = News.postobjects.order_by('-published').all().filter(status='published')

        # # Si la categoría tiene un padre, filtrar sólo por esta categoría y no por el padre también
        # if category.parent:
        #     posts = posts.filter(category=category)

        # # Si la categoría no tiene una categoría padre, significa que ella misma es una categoría padre
        # else: 

            #Filtrar categoria sola
            if not Category.objects.filter(parent=category).exists():
                posts = posts.filter(category=category)
            # Si esta categoría padre tiene hijos, filtrar por la categoría padre y sus hijos
            else:
                sub_categories = Category.objects.filter(parent=category)
                
                filtered_categories = [category]

                for cat in sub_categories:
                    filtered_categories.append(cat)

                filtered_categories = tuple(filtered_categories)

                posts = posts.filter(category__in=filtered_categories)
                    
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(posts, request)
            serializer = NewsListSerializer(results, many=True)

            return paginator.get_paginated_response({'posts': serializer.data})
        else:
            return Response({'error':'No posts found'}, status=status.HTTP_404_NOT_FOUND)


class NewsDetailView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, slug, format=None):
        if News.postobjects.filter(slug=slug).exists():
            
            news = News.postobjects.get(slug=slug)
            serializer = NewsSerializer(news)

            address = request.META.get('HTTP_X_FORWARDED_FOR')
            if address:
                ip = address.split(',')[-1].strip()
            else:
                ip = request.META.get('REMOTE_ADDR')

            if not ViewCount.objects.filter(news=news, ip_address=ip):
                view = ViewCount(news=news,ip_address=ip)
                view.save()
                news.views += 1
                news.save()

            return Response({'news':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'News doesnt exist'}, status=status.HTTP_404_NOT_FOUND)
        

class NewsAuthDetailView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, slug, format=None):
        if News.postobjects.filter(slug=slug).exists():
            
            news = News.postobjects.get(slug=slug)
            serializer = NewsSerializer(news)

            address = request.META.get('HTTP_X_FORWARDED_FOR')
            if address:
                ip = address.split(',')[-1].strip()
            else:
                ip = request.META.get('REMOTE_ADDR')

            if not ViewCount.objects.filter(news=news, ip_address=ip):
                view = ViewCount(news=news,ip_address=ip)
                view.save()
                news.views += 1
                news.save()

            return Response({'news':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'News doesnt exist'}, status=status.HTTP_404_NOT_FOUND)


class SearchNewsView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request, format=None):
        search_term = request.query_params.get('s')
        matches = News.postobjects.filter(
            Q(title__icontains=search_term) |
            Q(description__icontains=search_term) |
            Q(content__icontains=search_term) |
            Q(category__name__icontains=search_term)
        )

        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(matches, request)

        serializer = NewsListSerializer(results, many=True)
        return paginator.get_paginated_response({'filtered_news': serializer.data})
    

class AuthorNewsListView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, format=None):

        user = self.request.user

        if News.objects.filter(author=user).exists():

            posts = News.objects.filter(author=user)

            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(posts, request)
            serializer = NewsListSerializer(results, many=True)

            return paginator.get_paginated_response({'posts': serializer.data})
        else:
            return Response({'error':'No posts found'}, status=status.HTTP_404_NOT_FOUND)


class EditNewsPostView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, format=None):
        user = self.request.user

        data = self.request.data
        slug = data['slug']

        print(data)
        
        post = News.objects.get(slug=slug)

        if(data['title']):
            if not (data['title'] == 'undefined'):
                post.title = data['title']
                post.save()
        if(data['new_slug']):
            if not (data['new_slug'] == 'undefined'):
                post.slug = slugify(data['new_slug'])
                post.save()
        if(data['description']):
            if not (data['description'] == 'undefined'):
                post.description = data['description']
                post.save()
        if(data['time_read']):
            if not (data['time_read'] == 'undefined'):
                post.time_read = data['time_read']
                post.save()
        if(data['content']):
            if not (data['content'] == 'undefined'):
                post.content = data['content']
                post.save()

        if(data['category']):
            if not (data['category'] == 'undefined'):
                category_id = int(data['category'])
                category = Category.objects.get(id=category_id)
                post.category = category
                post.save()

        if(data['thumbnail']):
            if not (data['thumbnail'] == 'undefined'):
                post.thumbnail = data['thumbnail']
                post.save()

        return Response({'success': 'Post edited'})

class DraftNewsPostView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )
    def put(self, request, format=None):
        data = self.request.data
        slug = data['slug']

        post = News.objects.get(slug=slug)

        post.status = 'draft'
        post.save()

        return Response({'success': 'Post edited'})


class PublishNewsPostView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )
    def put(self, request, format=None):
        data = self.request.data
        slug = data['slug']

        post = News.objects.get(slug=slug)

        post.status = 'published'
        post.save()

        return Response({'success': 'Post edited'})

class DeleteNewsPostView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )
    def delete(self, request, slug, format=None):
        
        post = News.objects.get(slug=slug)

        post.delete()

        return Response({'success': 'Post edited'})

class CreateNewsPostView(APIView):
    permission_classes = (AuthorPermission, )
    def post(self, request, format=None):
        user = self.request.user
        News.objects.create(author=user)

        return Response({'success': 'Post edited'})
    
class CategoriesWithNewsView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        categories = Category.objects.all()
        data = []

        for category in categories:
            news = News.postobjects.filter(category=category, status='published').order_by('-published')
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(news, request)
            serializer = NewsListSerializer(results, many=True)
            data.append({
                'category': category.name,
                'slug': category.slug,
                'news': serializer.data
            })

        return Response(data, status=status.HTTP_200_OK)