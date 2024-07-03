# CodeStorm Educational Platform Angular17

![GitHub Repo stars](https://img.shields.io/github/stars/banudik/Tobeto3A-BootcampProject-Angular)
![GitHub forks](https://img.shields.io/github/forks/banudik/Tobeto3A-BootcampProject-Angular)
![GitHub issues](https://img.shields.io/github/issues/banudik/Tobeto3A-BootcampProject-Angular)
![GitHub contributors](https://img.shields.io/github/contributors/banudik/Tobeto3A-BootcampProject-Angular)
![GitHub last commit](https://img.shields.io/github/last-commit/banudik/Tobeto3A-BootcampProject-Angular)

[Backend API ReadMe](https://github.com/banudik/Tobeto3A-NArchitecture.BootcampProject)

## Project Description
This educational platform is designed to offer users online courses on various topics. The platform allows users to register, participate in courses, and track their progress.
## Features
<table>
  <tr>
    <td>- Responsive Design</td>
    <td>- User Registration and Login System</td>
  </tr>
  <tr>
    <td>- Authorization for Account Security</td>
    <td>- Role-Based Access Control (Instructor, Student, Admin)</td>
  </tr>
  <tr>
    <td>- Single Login Screen for 3 User Types</td>
    <td>- Dynamic Search, Pagination, and Listing by Instructor for Courses</td>
  </tr>
  <tr>
    <td>- View Course Content and Track Progress</td>
    <td>- User Profile</td>
  </tr>
  <tr>
    <td>- Completion Certificate at the End of Training</td>
    <td>- Admin and Instructor Panel</td>
  </tr>
  <tr>
    <td>- Dark Mode</td>
    <td>- Global Error Handler</td>
  </tr>
  <tr>
    <td>- Authorization Interceptor</td>
    <td>- Refresh Token and Token Renewal</td>
  </tr>
  <tr>
    <td>- Token Revocation</td>
    <td>- JWT</td>
  </tr>
</table>

## Architectural Structure
This project adopts the Feature-based Modular Architecture approach. This architecture ensures better organization and management of the project.

## Angular File Structure
<p float="left">
  <img src="https://i.imgur.com/GJvxKJr.png" alt="Project Image 1" width="400"/>
</p>

## Global Error Handler
<p float="left">
  <img src="https://i.imgur.com/cfZRgJK.png" alt="Project Image 1" width="200"/>
</p>
We catch all errors that may occur in the application at a central point and show appropriate messages to the user. This allows for more effective error management and logging. Error messages from the API are shown to the user as Toastr notifications.

## Auth Interceptor
The authorization interceptor automatically adds the JWT token to every HTTP request and manages the authorization processes.

## Refresh Token/Token Renewal and Revoke Token
<p float="left">
  <img src="https://i.imgur.com/2RB0TbY.png" alt="Project Image 1" width="800"/>
</p>
Using refresh tokens, we extend user session durations so users do not need to log in again. When a user logs out or in case of a security breach, the token is revoked, blocking access. The refresh token is stored as an HttpOnly Cookie.

## Admin Panel Guard
<p float="left">
  <img src="https://i.imgur.com/9Crsfo2.png" alt="Project Image 1" width="650"/>
</p>
The AdminPanelGuard ensures that only users with admin privileges can access the admin panel. This guard checks the user's permissions and redirects users without the necessary privileges.

## Home Page and About Us
<p float="left">
  <img src="https://i.imgur.com/5tyHvdt.png" alt="Project Image 1" width="400"/>
  <img src="https://i.imgur.com/XYSdy6i.png" alt="Project Image 2" width="400"/>
</p>

- Pages showing platform statistics and some training courses for users

## Listing All Courses and Course Detail Pages
<p float="left">
  <img src="https://i.imgur.com/9iiMo7s.png" alt="Project Image 1" width="400"/>
  <img src="https://i.imgur.com/6SN7He1.png," alt="Project Image 1" height="250"/>
</p>

- Features such as dynamic search, listing by instructor name, pagination, and selecting the number of courses displayed on a single page
- Only accounts with student status can apply to courses that are open for application

## Contact and FAQ 
<p float="left">
  <img src="https://i.imgur.com/TIxxXSz.png" alt="Project Image 1" width="400"/>
  <img src="https://i.imgur.com/wWc5PWX.png" alt="Project Image 2" width="400"/>
</p>

- Users can send emails for contact through the site

## Login 
<p float="left">
  <img src="https://i.imgur.com/kRBAuUt.png" alt="Project Image 1" width="400"/>
  <img src="https://i.imgur.com/sxFuC0Y.png" alt="Project Image 2" width="400"/>
</p>

- Users can log in from the same place with 3 user types, night and day mode selection is stored in LocalStorage and continues with the selected mode when the user logs in again.

## Student Registration Page
<p float="left">
  <img src="https://i.imgur.com/CZoFjVj.png" alt="Project Image 1" width="263"/>
  <img src="https://i.imgur.com/ogmGHp9.png" alt="Project Image 1" width="263"/>
  <img src="https://i.imgur.com/dLBZDRC.png" alt="Project Image 2" width="263"/>
</p>

- Dynamic validation allows real-time tracking of the values entered by the user.

## NavBar Changing According to User Type 
<p float="left">
  <img src="https://i.imgur.com/iHjjBsC.png" alt="Project Image 1" width="250"/>
  <img src="https://i.imgur.com/LM9334q.png" alt="Project Image 2" width="250"/>
</p>

- The navbar changes according to the role in JWT stored in LocalStorage

## Mails
<p float="left">
  <img src="https://i.imgur.com/PdnjkZ1.png" alt="Project Image 1" width="263"/>
  <img src="https://i.imgur.com/AdDGgLD.png" alt="Project Image 1" width="263"/>
  <img src="https://i.imgur.com/arZn9sl.png" alt="Project Image 2" width="263"/>
</p>

- Email verification for newly registered students, two-factor authentication for each login, and email sending for situations such as forgot password

## Admin and Instructor Panel
<p float="left">
  <img src="https://i.imgur.com/ZTg5828.png" alt="Project Image 1" width="400"/>
  <img src="https://i.imgur.com/BYVWkx8.png" alt="Project Image 2" width="400"/>
</p>

- Panel structure that changes according to instructor and admin roles
- Perform CRUD operations for all entities such as Course, Instructor, Student, Chapter

## Forgot Password and Password Reset
<p float="left">
  <img src="https://i.imgur.com/54tpgVM.png" alt="Project Image 1" width="400"/>
  <img src="https://i.imgur.com/ZtnfaJJ.png" alt="Project Image 2" width="400"/>
</p>

- For users who forgot their password, a URL containing a JWT token is created and sent to the user via email. The user is directed to the password reset page through this link in the email. When creating a new password, the user can see the suitability of the password in real-time with dynamic validation.

### Contact
If you have any questions or feedback about this project, please contact us.

### Contribution
If you want to contribute to this project, please follow the steps below:

Fork the repository.
Create a new branch: git checkout -b my-new-feature
Commit your changes: git commit -am 'Add some feature'
Push to the branch: git push origin my-new-feature
Create a Pull Request.

## Thank you
