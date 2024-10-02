from rest_framework import serializers
from .models import Transmission

class TransmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transmission
        fields = ['id', 'link']