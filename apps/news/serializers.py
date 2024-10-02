from rest_framework import serializers
from .models import *
from apps.category.serializers import CategorySerializer

class NewsSerializer(serializers.ModelSerializer):
    category=CategorySerializer()
    get_status=serializers.CharField(source='status')
    class Meta:
        model = News
        fields=[
            'id',
            'title',
            'slug',
            'thumbnail',
            'description',
            'content',
            'time_read',
            'published',
            'views',
            'category',
            'get_status'
        ]


class NewsListSerializer(serializers.ModelSerializer):
    category=CategorySerializer()
    class Meta: 
        model=News
        fields=[
            'id',
            'title',
            'slug',
            'thumbnail',
            'description',
            'time_read',
            'published',
            'views',
            'category',
            'status'
        ]