FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Backend klasöründeki tüm dosyaları /src altına kopyala
COPY . .

# Çalışma dizinini backend olarak ayarla
WORKDIR /src

# Restore işlemini backend.sln dosyasına göre yap
RUN dotnet restore backend.sln

# Publish işlemi backend.sln dosyasına göre yap
RUN dotnet publish backend.sln -c Release -o /app/publish

# Runtime aşaması
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80

ENTRYPOINT ["dotnet", "backend.dll"]  # backend.dll dosyanın gerçek ismine göre değiştir
