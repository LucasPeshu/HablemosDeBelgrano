from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField
from apps.category.models import Category
from django.conf import settings

User = settings.AUTH_USER_MODEL

def news_thumbnail_directory(instance, filename):
    return 'news/{0}/{1}'.format(instance.title, filename)

# Create your models here.
class News(models.Model):

    class NewsObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title =         models.CharField(max_length=255, default='Title')
    slug =          models.SlugField(max_length=255, unique=True, default='slug')
    thumbnail =     CloudinaryField('image', folder='news', default='news') 

    author =        models.ForeignKey(User, on_delete=models.CASCADE)
    
    description =   models.TextField(max_length=255, default='Description')
    content =       RichTextField(default='Content')

    time_read =     models.IntegerField(default=5)

    published =     models.DateTimeField(default=timezone.now)
    views =         models.IntegerField(default=0, blank=True)

    status =        models.CharField(max_length=10, choices=options, default='draft')

    category =      models.ForeignKey(Category, on_delete=models.PROTECT, default=1)

    objects =           models.Manager()
    postobjects =       NewsObjects()

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.title

    def get_view_count(self):
        views = ViewCount.objects.filter(post=self).count()
        return views
    
    def get_status(self):
        status = self.status
        return status



class ViewCount(models.Model):
    news = models.ForeignKey(News, related_name='newspost_view_count', on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.ip_address}"