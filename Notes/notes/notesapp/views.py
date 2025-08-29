from django.shortcuts import render

from .models import Note
from .serializers import NoteSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated


# Create your views here.
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def notes(request):
    if request.method == 'GET':
        search_query = request.GET.get('search', '')

        if search_query:
            notes = Note.objects.filter(
                Q(title__icontains=search_query) |
                Q(body__icontains=search_query) |
                Q(category__icontains=search_query)
            ).order_by('-id')   # latest first
        else:
            notes = Note.objects.all().order_by('-id')

        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def note_detail(request, slug):
    try:
        note = Note.objects.get(slug=slug)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NoteSerializer(note)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_categories(request):
    return Response([{"value": c[0], "label": c[1]} for c in Note.CATEGORY])

