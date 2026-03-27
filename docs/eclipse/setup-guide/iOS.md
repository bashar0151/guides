# iOS

This guide provides a quick setup guide for the **Eclipse** mobile app.

---

## Requirements 

* **Debrid Vault Account:** You will need to have a registered Debrid Vault account [Debrid Vault Setup Guide](../../debrid-vault/setup-guide/index.md).
* **TestFlight Invitation:** Currently, access is limited to VIPs/donors [Ko-fi](https://ko-fi.com/debridvault) or [Patreon](https://ko-fi.com/debridvault).
* **Signup Music Eclipse Addon:** You will need to sign up to the Eclipse Music Addon to obtain the URL manifest you need to link to your Eclipse mobile app. Please see setup instructions below.

:::danger
**Donors:** Please ensure you include your Discord username in the donation note or DM **doctor** on [Discord](https://discord.gg/A8j4c42sdY) so you can be assigned the appropriate role for testing Eclipse to receive a TestFlight invite.
:::

---

## Thank You

:::tip
Thank you for donating! Your support directly helps with the development!
:::

---

# ** OFFICIAL SETUP GUIDE**

:::info Account Creation
1. Go to https://api.eclipsemusic.app/configure and create an account (**THIS WILL BE THE SAME ACCOUNT YOU LOG INTO ECLIPSE, THIS IS NOT YOUR DEBRID VAULT ACCOUNT. YOU MUST CREATE A FRESH ACCOUNT**)
:::

2. Once logged in, input your torbox API key (if you dont have torbox skip this step and only input the debrid vault part, you can still use the app withour debrid, just won’t be able to utilize debrid functions) into the cloud storage section. In music search for url type in `https://debridvault.elfhosted.com/` and for api key, get on from your Debrid Vault Account settings, you can create one and input it. Once these are inputted generate a manifest URL

3. Go to eclipse, log in with same log in info. Go to **Settings** -> **CloudStorage** -> **Add Connection** -> **Cloud** ... here pasted the manifest url and connect

4. Once connected you will see **SIMPLE** mode and **ADVANCED MODE**. Simple mode allows u to just stream and not worry. just make sure to enable stream mode for it like apple music for example. ADVANCED MODE gives you more thigns to play with and lets u select search provider in serach tab. **iTUNES/SPOTIFY** are for torrent/usenet searching **YT MUSIC and SOUNDCLOUD** are for WEB DOWNLOADS VIA TORBOX. 

5. Within these settings in cloud you will see options to enable animated art and all that good stuff.

6. When set up if you have stuff in Debrid Section you can tap on 3 dot context menu and edit info and apply metadata. You can also apply embedded metadata by running an extract. 

---

### **SIDE NOTES**

* You can select quality for stream mode
* HI-RES doesnt work on tidal
* LastFM integration exists
* There are other settings like crossfade, loudness normalization, equlaizer, lyric offset etc

---


## BASH'S Setup Instructions

### Create your API Keys and Link to Eclipse
1. Log in to your [Debrid Vault account](https://debridvault.elfhosted.com/settings).
2. Navigate to **Settings**, then click the **Accounts** tab.
3. Scroll down to the **Mobile App Access** section.
4. Type a name for your API key (e.g., "Eclipse Mobile") and click **Create**.
<img src="/img/eclipse/setup-guide/image-1768236161834.png" style={{ maxWidth: '100%', height: 'auto' }} alt="API Key Setup" />

5. **Copy your API key**, then click the **'I've saved the key'** button. Keep it handy to enter the generated API in the Eclipse Addon.
6. Sign up to the Eclipse Music App. The link to the Eclipse Addon is located in the useful tools section on your Debrid Vault (DV) homepage [Debrid Vault Useful Tools](https://debridvault.elfhosted.com/tools).
<img src="/img/eclipse/setup-guide/eclipse-addon-loginn-page.png" style={{ maxWidth: '100%', height: 'auto' }} alt="Eclipse Addon Login" />

7. On the Eclipse Addon setup page, enter your API keys and click on connect for **Cloud Storage** and **Music Search**. 

<img src="/img/eclipse/setup-guide/eclipseaddonapi.png" style={{ maxWidth: '100%', height: 'auto' }} alt="Eclipse Addon API Key Information" />
<img src="/img/eclipse/setup-guide/ioseclipsemsuicaddonfinal.png" style={{ maxWidth: '100%', height: 'auto' }} alt="Eclipse Addon API Key Information" />


| Section | Required Information |
| :--- | :--- |
| **CLOUD STORAGE** | TORBOX API KEY |
| **MUSIC SEARCH URL** | `https://debridvault.elfhosted.com/` |
| **MUSIC SEARCH KEY** | DEBRID VAULT ADDON API KEY (See step 4) |

8. Connect your manifest URL into Eclipse in **Settings** -> **Cloud Storage** -> **Add Connection** -> **Cloud**.

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
  <img src="/img/eclipse/setup-guide/1_settings.png" style={{ width: '150px', height: 'auto' }} alt="Step 1" />
  <img src="/img/eclipse/setup-guide/2_add_connection.png" style={{ width: '150px', height: 'auto' }} alt="Step 2" />
  <img src="/img/eclipse/setup-guide/3_connections.png" style={{ width: '150px', height: 'auto' }} alt="Step 3" />
  <img src="/img/eclipse/setup-guide/4_cloud_paste_manifest_url.png" style={{ width: '150px', height: 'auto' }} alt="Step 4" />
  <img src="/img/eclipse/setup-guide/5-connected.png" style={{ width: '150px', height: 'auto' }} alt="Step 5" />
</div>

---

### Mobile App Installation

:::info
Apple have nowapprove Eclipse for public testing in TestFlight, you can now enroll to use is on you device.
:::

1. Once you receive the invite, follow the instructions in your email to get **TestFlight** set up.
2. Ensure the TestFlight app is installed on your mobile device; this is where you will download and update Eclipse.
3. Open **Eclipse** and sign in.
4. Tap the **Settings** icon on the bottom navigation bar.

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
  <img src="/img/eclipse/setup-guide/image-1768239155747.jpeg" style={{ width: '250px', height: 'auto' }} alt="Eclipse App Icon" /> 
  <img src="/img/eclipse/setup-guide/image-1768239309799.png" style={{ width: '250px', height: 'auto' }} alt="Sign in page" />
</div>

---

**Enjoy!** You are all set up and ready to use Eclipse.