from django.urls import path
from .views import TransmissionLinkView, EditTransmissionLinkView

urlpatterns = [
    path('<int:pk>/', TransmissionLinkView.as_view(), name='transmission-link'),
    path('edit/<int:pk>/', EditTransmissionLinkView.as_view(), name='edit-transmission-link'),
]