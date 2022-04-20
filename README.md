# Martin Workshop

*I might just kill 3 birds with one stone creating PWA + Android + IOS by using https://ionicframework.com/ or https://tailwindcss.com/ (or both) + https://capacitorjs.com/ because Javascript is better than JAVA :3*

>Since the different workshops have different requirements, there will be separate folders, which will respect each workshop's requirement

*There will be also a todo list, which will be updated each time with the tasks*

## PWA todo list 
### Backend

- [x] Simple Auth
    - [x] Sign In
    - [x] Sign Up
    - [x] Log out
- [ ] Seller Endpoint
  - [x] Create Concerts
  - [ ] View Sales
- [ ] Check Up Endpoint
  - [ ] Ticket validation
- [ ] Implement the Push Notification Server
- [x] API Docs

### Frontend

- [x] Auth Portal
    - [x] Sign In
    - [x] Sign Up
- [x] Tickets Page
- [ ] Dynamic Home Page (gets removed on successful login)
- [ ] Ticket Dashboard
  - [ ] Analytics
  - [ ] Create Concert

---
## IOS todo list

Linage(the name came before the idea), based on the getting started, it sparked my idea to do a list of all the Fontys Buildings and their open hours, with an Apple Maps preview of the location.

- [x] Get a Mac
=======
- [x] Main Nav Page
  - [x] List Navigation of Campuses
- [x] Campus Page
  - [x] Maps
  - [x] Avatar
  - [x] Title
  - [x] Working Hours
  - [x] Description
- [ ] Reserve Oil Page
  - [ ] Date Time Selector
  - [ ] Oil list
- [x] Dynamic Content Loading
  - [x] Json Data
  - [x] Model
  - [x] Link Data to Campus Page
- [x] Buildings (3/15 [Number based on Google Maps])
  - [x] Name
  - [x] Location
  - [x] Image
  - [x] Open Hours

---

## DEPRECATED duo project Ticket app (eg Concerts, Museums etc)

The app is going to be used for organizers to use a more simplified ticketing system. It will use a QR scan feature (might add NFC), which will allow for faster scanning and management without worries. There will be a possibility to issue QR or NFC (TBD), on the physical tickets.

*A shot summary of the to-do list (in reality there is more but my mind hasn't decided what to use)*

*For the QR Scanning, there is an option to use the QR Bot/QR Scanner library, but it required their app to be installed as well*

- [x] Qr code generation Functionality
- [ ] Scanning the QR codes (TBD, the library needs an update for the scanner to work, the alternative is the Google one which is 7 years old /Broken/)
  
### **Backend**

- [ ] Prisma database
- [ ] Oauth with Gitlab
- [ ] Rest API
- [ ] API DOCS
  
### **Frontend** 

- [ ] Capacitor
- [ ] TailwindCSS
- [ ] Vue
- [ ] QR Code lib
- [ ] User Portal
- [ ] Organizer Portal