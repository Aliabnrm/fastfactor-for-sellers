Product Requirements Document (PRD)
FastFactor for Sellers

Version: 1.0

Status: Draft

Author: Ali Abnrm

1. Product Overview
Product Name

FastFactor for Sellers

Product Type

B2B SaaS

Problem Statement

بسیاری از فروشندگان کوچک محصولات خود را از طریق شبکه‌های اجتماعی مانند Instagram، Telegram و WhatsApp می‌فروشند.

فرآیند فعلی آن‌ها معمولاً شامل موارد زیر است:

دریافت سفارش از طریق پیام
دریافت فیش پرداخت به صورت عکس
ثبت دستی آدرس مشتری
پیگیری سفارش‌ها داخل چت

این فرآیند باعث می‌شود:

اطلاعات ناقص ثبت شود.
سفارش‌ها گم شوند.
پیگیری سخت شود.
زمان زیادی صرف مدیریت سفارش‌ها شود.
Vision

ایجاد ساده‌ترین سیستم ثبت سفارش برای فروشندگانی که وب‌سایت فروشگاهی ندارند.

Goals

سیستم باید بتواند:

فروشنده را احراز هویت کند.
فروشگاه ایجاد کند.
لینک عمومی سفارش تولید کند.
سفارش مشتری را ثبت کند.
سفارش‌ها را مدیریت کند.
Non Goals

این محصول فروشگاه اینترنتی نیست.

در نسخه اول موارد زیر وجود ندارند:

Shopping Cart
Payment Gateway
Product Catalog
Multi Vendor Marketplace
Customer Accounts
2. Target Users
Primary User

Seller

خصوصیات:

فروشنده اینستاگرامی
فروشنده خانگی
فروشنده کوچک
کسب‌وکارهای B2B کوچک
Secondary User

Customer

ویژگی‌ها:

حساب کاربری ندارد.
فقط فرم سفارش را پر می‌کند.
3. User Personas
Seller

نیازها:

دریافت سفارش مرتب
مدیریت سفارش‌ها
اشتراک‌گذاری لینک سفارش
Customer

نیازها:

ثبت سریع سفارش
ارسال فیش پرداخت
4. User Journey
Seller Journey
Register

↓

Login

↓

Create Store

↓

Receive Public Link

↓

Share Link

↓

Receive Orders

↓

Manage Orders
Customer Journey
Open Public Link

↓

Fill Form

↓

Upload Receipt

↓

Submit Order
5. Functional Requirements
Authentication

Seller باید بتواند:

Register
Login
Logout
Refresh Token
View Profile
Store

Seller باید بتواند:

ایجاد فروشگاه
ویرایش فروشگاه
تغییر Slug
مشاهده اطلاعات فروشگاه
Public Store

سیستم باید:

فروشگاه را با Slug نمایش دهد.
بدون Login قابل مشاهده باشد.
Orders

Customer باید بتواند:

ثبت سفارش
ارسال فیش
ثبت اطلاعات تماس

Seller باید بتواند:

مشاهده سفارش‌ها
مشاهده جزئیات سفارش
6. Non Functional Requirements

Backend باید:

RESTful باشد.
Stateless باشد.
JWT Authentication داشته باشد.
Refresh Token Rotation داشته باشد.
Clean Architecture داشته باشد.
Repository Pattern داشته باشد.
Error Handling استاندارد داشته باشد.
Validation داشته باشد.
Logging داشته باشد.
قابل Deploy باشد.
7. Business Rules
BR-001

هر User دقیقاً یک Store دارد.

BR-002

هر Store فقط یک Owner دارد.

BR-003

Slug باید یکتا باشد.

BR-004

Slug قابل تغییر است.

BR-005

Customer حساب کاربری ندارد.

BR-006

هر Order متعلق به یک Store است.

BR-007

هر Order فقط یک محصول دارد.

BR-008

Receipt Image برای ثبت سفارش الزامی است.

BR-009

فروشنده فقط سفارش‌های فروشگاه خودش را مشاهده می‌کند.

BR-010

Public Order Form نیاز به Login ندارد.

BR-011

تا زمانی که Store ساخته نشده باشد Dashboard در دسترس نیست.

8. Assumptions

نسخه اول سیستم فرض می‌کند:

هر فروشنده فقط یک فروشگاه دارد.
هر سفارش فقط یک محصول دارد.
هر سفارش یک تصویر فیش دارد.
مشتری Guest است.
9. Constraints

نسخه اول شامل موارد زیر نیست:

Multi Product Orders
Payment Gateway
Customer Accounts
Inventory Management
Coupon
Discount
Shipping Tracking
10. Success Metrics

سیستم باید بتواند:

ثبت فروشنده
ساخت فروشگاه
ایجاد لینک عمومی
ثبت سفارش
مشاهده سفارش توسط فروشنده

را بدون خطا انجام دهد.

11. Future Scope

نسخه‌های آینده:

وضعیت سفارش
Dashboard Analytics
WhatsApp Notification
SMS
چند محصول در هر سفارش
پنل Admin
چند فروشگاه برای هر فروشنده
12. Technical Scope

Backend:

Node.js
Express
TypeScript
PostgreSQL
JWT
Refresh Token Rotation
Cookie Authentication
Multer
Cloudinary (یا S3)
Zod Validation
Winston/Pino Logging

Frontend:

React
TypeScript
TanStack Query
React Router
TailwindCSS
shadcn/ui