---
sidebar_position: 5
sidebar_label: 'Unofficial Android Auto'
---

# Unofficial Android Auto Setup

This guide provides the necessary steps to set up **Android Auto** using the **Debrid Vault Web App** for enhanced functionality in your vehicle.

---

### Requirements

---

:::danger
**Hardware Compatibility:** At the time of writing, the **AAWireless Adapter** is the only known working method for this setup. Using other wireless adapters or devices is at your own risk and will likely result in the setup failing. 

 **Why this works:** Enabling Developer Mode within the AAWireless device settings allows the adapter to bypass standard Android Auto restrictions. Normally, these restrictions prevent the correct **Fermata Auto** app from showing or opening within the Android Auto interface. This bypass ensures the app displays correctly and functions on your head unit.
 :::


---

| Item | Requirement |
| :--- | :--- |
| **Smartphone** | Android device |
| **Vehicle** | Car with native Android Auto support |
| **Hardware** | [AAWireless Adapter](https://amzn.eu/d/hu2zomw) (Required model) |
| **Fermeta APK** | [AAWireless App](https://play.google.com/store/apps/details?id=app.aawireless)|
| **Fermeta APK** | [Fermeta App](https://github.com/AndreyPavlenko/Fermata/releases) (Required model) |
| **DV URL** | https://debridvault.elfhosted.com |


---

### Installation Steps

#### AAWireless Configuration
1. **Download** the [AAWireless Companion App](https://play.google.com/store/apps/details?id=app.aawireless).
2. **Connect:** Plug in the adapter to your car and connect via the AAWireless app.
3. **Developer Mode:** In the app, go to **Settings** > **Advanced** and enable **Developer Mode**.

#### Fermeta Installation
4. **Download** the [AAAD APK](https://github.com/AndreyPavlenko/Fermata/releases).
6. **Install Fermeta:** Open the APK and allow "Unknown Apps" permissions.
7. **Install Fermata Auto:** Open the Fermeta APK to install the APK.

#### Web App Setup
8. **Open Fermata Auto** and tap the **hamburger icon** ![](/img/unoffical-andriod-auto-setup/image-1767475772639.png)(bottom right).
9. **Select Desktop Version**, you should see a little check mark after you press it
10. **Select Web Browser, on the bottom navigation bar**
11. **Bookmark:** Enter your **Debrid Vault URL** in the address bar, then tap the **Star icon** (top right) to save it.

---

### Usage
* Connect your phone to the car.
* Open **Fermata Auto** on your car display.
* Open your **Debrid Vault bookmark**.
* Press on the hamburger icon ![](/img/unoffical-andriod-auto-setup/image-1767475795542.png), then click on full screen

---
---

### Screen Alignment and DPI Settings

:::TIP
**Optimise your display:** You can change the **DPI (Dots Per Inch)** value in the AAWireless app settings to improve the alignment on your infotainment screen. 

 1. Open the **AAWireless app** while connected.
 2. Navigate to **Settings** > **Change DPI**.
 3. Enter a value and save.
 :::

| Screen Size | Recommended DPI Value |
| :--- | :--- |
| **8-Inch Screens** | 103 or 112 |
| **10-Inch+ Screens** | 150 or higher |
| **Maps Optimization** | 125 or 140 |

:::note
**Trial and Error:** Lower values (90–110) usually create a more compact interface with the taskbar on the side. Higher values often result in a full-screen layout. You may need to test a few settings to find what works best for your specific car display.
:::
