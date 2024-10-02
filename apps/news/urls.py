from django.urls import path
from .views import *

urlpatterns = [
    path('list',NewsListView.as_view()),
    path('by_category',ListNewsByCategoryView.as_view()),
    path('detail/<slug>',NewsDetailView.as_view()),
    path('auth_detail/<slug>',NewsAuthDetailView.as_view()),
    path('search',SearchNewsView.as_view()),
    path('categories-with-news/', CategoriesWithNewsView.as_view(), name='categories-with-news'),
    
    path('author_list',AuthorNewsListView.as_view()),
    path('edit',EditNewsPostView.as_view()),
    path('draft',DraftNewsPostView.as_view()),
    path('publish',PublishNewsPostView.as_view()),
    path('delete/<slug>',DeleteNewsPostView.as_view()),
    path('create',CreateNewsPostView.as_view()),
]