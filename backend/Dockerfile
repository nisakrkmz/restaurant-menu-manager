# Build aşaması
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Proje dosyalarını kopyala
COPY . .

# Restore işlemi
RUN dotnet restore backend.sln

# Yayınlama işlemi
RUN dotnet publish backend.sln -c Release -o /app/publish

# Runtime aşaması
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Yayınlanmış dosyaları kopyala
COPY --from=build /app/publish .

# API'nin dinleyeceği port
EXPOSE 80

# Uygulamayı başlat (DLL adını senin çıkan dosyana göre güncelle!)
ENTRYPOINT ["dotnet", "backend.dll"]

