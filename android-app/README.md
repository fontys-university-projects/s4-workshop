**WARNING**
Gradle has always been one of my least favorite tools in the world. If the app does not run, it is because Gradle does not like ExFAT drives. It should be NTFS.

## Creating a production distributable
```
ionic build
```

**I have configured gitignore to remove android and dist folder on purpose**

## Creating the android app form dist
```
ionic cap add android
```

## Running the android app from Android Studio
```
ionic cap open android
```

##If you want to use an external device you need to use another command
```
ionic cap run android -l --external
```
