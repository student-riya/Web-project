from datetime import date, datetime, timedelta
from django.contrib.auth.models import User
from django.db.models import Sum

from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Transaction, DueNotification, EcommerceTransaction
from .serializers import TransactionSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)


class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user).order_by('-date_time')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def monthly_expenses(request):
    user = request.user
    now = datetime.now()
    current_month = now.month
    current_year = now.year

    expenses = (
        Transaction.objects
        .filter(user=user, date_time__month=current_month, date_time__year=current_year)
        .values('category')
        .annotate(total=Sum('amount'))
    )

    return Response(expenses)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def upcoming_dues(request):
    today = date.today()
    upcoming = today + timedelta(days=7)

    dues = DueNotification.objects.filter(
        user=request.user,
        due_date__range=[today, upcoming],
        is_paid=False
    ).values('title', 'amount', 'due_date')

    return Response(dues)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ecommerce_transactions(request):
    transactions = EcommerceTransaction.objects.filter(user=request.user).order_by('-purchase_date')

    data = [
        {
            "item_name": t.item_name,
            "quantity": t.quantity,
            "amount": t.amount,
            "purchase_date": t.purchase_date,
        }
        for t in transactions
    ]
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    total_tx = Transaction.objects.filter(user=user).count()

    return Response({
        "username": user.username,
        "email": user.email,
        "total_transactions": total_tx,
    })


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    username = request.data.get("username")
    password = request.data.get("password")

    if username:
        if User.objects.filter(username=username).exclude(id=user.id).exists():
            return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)
        user.username = username

    if password:
        user.set_password(password)

    user.save()
    return Response({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)
