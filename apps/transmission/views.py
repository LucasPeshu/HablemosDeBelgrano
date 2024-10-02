from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Transmission
from .serializers import TransmissionSerializer

class TransmissionLinkView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            transmission = Transmission.objects.get(pk=kwargs['pk'])
            serializer = TransmissionSerializer(transmission)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Transmission.DoesNotExist:
            return Response({'error': 'Transmission not found'}, status=status.HTTP_404_NOT_FOUND)

class EditTransmissionLinkView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, *args, **kwargs):
        try:
            transmission = Transmission.objects.get(pk=kwargs['pk'])
            serializer = TransmissionSerializer(transmission, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Link updated successfully'}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Transmission.DoesNotExist:
            return Response({'error': 'Transmission not found'}, status=status.HTTP_404_NOT_FOUND)