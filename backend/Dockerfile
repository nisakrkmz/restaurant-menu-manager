# .NET 9 SDK kullanarak build aşaması
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Projeyi kopyala
COPY . .

# Restore işlemi
RUN dotnet restore backend.sln

# Publish işlemi
RUN dotnet publish backend.sln -c Release -o /app/publish

# Runtime aşaması
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 80

ENTRYPOINT ["dotnet", "backend.dll"]  # DLL ismini backend projenin derlenen adıyla değiştir

