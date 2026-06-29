from django.urls import path, include
from rest_framework import routers
from .views import ProjectViewSet, TaskViewSet, CommentViewSet, NotificationViewSet, RegisterView, me

router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'notifications', NotificationViewSet, basename='notification')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view({'post':'create'}), name='register'),
    path('auth/me/', me, name='me'),
]
