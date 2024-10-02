from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('api/news/', include('apps.news.urls')),
    path('api/category/', include('apps.category.urls')),
    path('admin/', admin.site.urls),
    path('api/transmission-link/', include('apps.transmission.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]