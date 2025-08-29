from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.notes, name='notes'),
    path('notes/<slug:slug>/', views.note_detail, name='note-detail'),
    path('categories/', views.get_categories, name='categories'),
]