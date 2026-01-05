import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonToggle,
  IonAlert,
  IonButton,
  IonAvatar,
  IonTextarea,
  IonNote,
  IonText,
  IonModal,
  IonInput,
  IonSpinner,
  useIonToast
} from '@ionic/react';
import {
  chevronBackOutline,
  notificationsOutline,
  lockClosedOutline,
  languageOutline,
  colorPaletteOutline,
  helpCircleOutline,
  logOutOutline,
  personCircleOutline,
  mailOutline,
  keyOutline,
  chevronForwardOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router';

// Dummy User Data
const DUMMY_USER = {
  name: 'أحمد محمود',
  email: 'ahmad.mahmoud@example.com',
  profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cfceee19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', // Replace with actual profile picture URL
  bio: 'مطور برمجيات، أحب السفر وقراءة الكتب.',
};

// Dummy Settings State
const initialSettings = {
  notificationsEnabled: true,
  darkModeEnabled: false,
  language: 'العربية',
};

const SettingsPage = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showDeleteAccountAlert, setShowDeleteAccountAlert] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [profileData, setProfileData] = useState(DUMMY_USER);
  const [newProfileData, setNewProfileData] = useState(DUMMY_USER);
  const [isSaving, setIsSaving] = useState(false);
  const history = useHistory();
  const [present] = useIonToast();

  const handleToggleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    if (key === 'darkModeEnabled') {
      document.body.classList.toggle('dark', value);
      present({
        message: value ? 'تم تفعيل الوضع المظلم.' : 'تم إلغاء تفعيل الوضع المظلم.',
        duration: 2000,
        position: 'bottom',
      });
    } else {
      present({
        message: value ? 'تم التفعيل بنجاح.' : 'تم الإلغاء بنجاح.',
        duration: 2000,
        position: 'bottom',
      });
    }
  };

  const handleLogout = () => {
    // Simulate logout process
    console.log('Logging out...');
    setShowLogoutAlert(false);
    present({
      message: 'تم تسجيل الخروج بنجاح.',
      duration: 2000,
      position: 'bottom',
    });
    // Redirect to login page (or home page for this demo)
    history.replace('/login'); 
  };

  const handleDeleteAccount = () => {
    // Simulate account deletion
    console.log('Account deleted.');
    setShowDeleteAccountAlert(false);
    present({
      message: 'تم حذف حسابك بنجاح.',
      duration: 2000,
      position: 'bottom',
    });
    // Redirect to login
    history.replace('/login');
  };

  const handleLanguageChange = (lang) => {
    setSettings(prev => ({ ...prev, language: lang }));
    setShowLanguageModal(false);
    present({
      message: `تم تغيير اللغة إلى ${lang}.`,
      duration: 2000,
      position: 'bottom',
    });
  };

  const handleProfileUpdate = async () => {
    setIsSaving(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    setProfileData(newProfileData);
    setIsSaving(false);
    setShowProfileEditModal(false);
    present({
      message: 'تم تحديث الملف الشخصي بنجاح.',
      duration: 2000,
      position: 'bottom',
    });
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfileData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <IonPage dir="rtl">
      <IonHeader translucent>
        <IonToolbar>
          <IonButton slot="end" onClick={() => history.goBack()} fill="clear" color="dark">
            <IonIcon icon={chevronBackOutline} />
          </IonButton>
          <IonTitle>الإعدادات والخصوصية</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList lines="full" className="ion-margin-top">
          {/* Section: Account/Profile */}
          <IonItem button onClick={() => {
            setNewProfileData(profileData);
            setShowProfileEditModal(true);
          }}>
            <IonAvatar slot="start">
              <img src={profileData.profilePicture} alt="Profile" />
            </IonAvatar>
            <IonLabel>
              <h2>{profileData.name}</h2>
              <p>عرض وتعديل الملف الشخصي</p>
            </IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button detail onClick={() => history.push('/account-security')}>
            <IonIcon icon={keyOutline} slot="start" color="medium" />
            <IonLabel>
              <h2>الأمان وتسجيل الدخول</h2>
            </IonLabel>
          </IonItem>
        </IonList>

        {/* Section: Preferences */}
        <IonList lines="full" className="ion-margin-top">
          <IonItemDivider>
            <IonLabel color="medium">التفضيلات</IonLabel>
          </IonItemDivider>

          <IonItem>
            <IonIcon icon={notificationsOutline} slot="start" color="primary" />
            <IonLabel>الإشعارات</IonLabel>
            <IonToggle
              slot="end"
              checked={settings.notificationsEnabled}
              onIonChange={(e) => handleToggleChange('notificationsEnabled', e.detail.checked)}
            />
          </IonItem>

          <IonItem button onClick={() => setShowLanguageModal(true)}>
            <IonIcon icon={languageOutline} slot="start" color="secondary" />
            <IonLabel>
              <h2>اللغة</h2>
              <IonNote slot="end">{settings.language}</IonNote>
            </IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem>
            <IonIcon icon={colorPaletteOutline} slot="start" color="tertiary" />
            <IonLabel>الوضع المظلم</IonLabel>
            <IonToggle
              slot="end"
              checked={settings.darkModeEnabled}
              onIonChange={(e) => handleToggleChange('darkModeEnabled', e.detail.checked)}
            />
          </IonItem>

          <IonItem button onClick={() => history.push('/privacy')}>
            <IonIcon icon={lockClosedOutline} slot="start" color="warning" />
            <IonLabel>
              <h2>الخصوصية</h2>
            </IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </IonList>

        {/* Section: Help & Support */}
        <IonList lines="full" className="ion-margin-top">
          <IonItemDivider>
            <IonLabel color="medium">الدعم والمساعدة</IonLabel>
          </IonItemDivider>

          <IonItem button onClick={() => history.push('/help-center')}>
            <IonIcon icon={helpCircleOutline} slot="start" color="success" />
            <IonLabel>
              <h2>مركز المساعدة</h2>
            </IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>

          <IonItem button onClick={() => history.push('/about')}>
            <IonIcon icon={personCircleOutline} slot="start" color="danger" />
            <IonLabel>
              <h2>حول تطبيق فيسبوك</h2>
            </IonLabel>
            <IonIcon icon={chevronForwardOutline} slot="end" />
          </IonItem>
        </IonList>

        {/* Section: Actions */}
        <IonList className="ion-margin-top ion-padding-bottom">
          <IonItemDivider>
            <IonLabel color="medium">إجراءات الحساب</IonLabel>
          </IonItemDivider>

          <IonItem button color="light" onClick={() => setShowLogoutAlert(true)}>
            <IonIcon icon={logOutOutline} slot="start" color="dark" />
            <IonLabel color="dark">
              <h2>تسجيل الخروج</h2>
            </IonLabel>
          </IonItem>

          <IonItem button detail={false} color="light" onClick={() => setShowDeleteAccountAlert(true)}>
            <IonLabel color="danger" className="ion-text-center">
              حذف الحساب نهائياً
            </IonLabel>
          </IonItem>
        </IonList>

        {/* Logout Alert */}
        <IonAlert
          isOpen={showLogoutAlert}
          onDidDismiss={() => setShowLogoutAlert(false)}
          header={'تسجيل الخروج'}
          message={'هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟'}
          buttons={[
            {
              text: 'إلغاء',
              role: 'cancel',
              handler: () => setShowLogoutAlert(false),
            },
            {
              text: 'تسجيل الخروج',
              handler: handleLogout,
              cssClass: 'alert-danger',
            },
          ]}
          dir="rtl"
        />

        {/* Delete Account Alert */}
        <IonAlert
          isOpen={showDeleteAccountAlert}
          onDidDismiss={() => setShowDeleteAccountAlert(false)}
          header={'حذف الحساب'}
          message={'سيؤدي هذا الإجراء إلى حذف حسابك بشكل دائم. هل أنت متأكد؟'}
          buttons={[
            {
              text: 'إلغاء',
              role: 'cancel',
              handler: () => setShowDeleteAccountAlert(false),
            },
            {
              text: 'حذف',
              cssClass: 'alert-danger',
              handler: handleDeleteAccount,
            },
          ]}
          dir="rtl"
        />

        {/* Language Modal */}
        <IonModal isOpen={showLanguageModal} onDidDismiss={() => setShowLanguageModal(false)} dir="rtl">
          <IonHeader>
            <IonToolbar>
              <IonTitle>اختر اللغة</IonTitle>
              <IonButton slot="start" onClick={() => setShowLanguageModal(false)} fill="clear">
                <IonIcon icon={chevronBackOutline} />
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {['العربية', 'English', 'Français', 'Español'].map((lang) => (
                <IonItem
                  key={lang}
                  button
                  onClick={() => handleLanguageChange(lang)}
                  detail={settings.language !== lang}
                  color={settings.language === lang ? 'light' : ''}
                >
                  <IonLabel>{lang}</IonLabel>
                  {settings.language === lang && <IonText color="primary" slot="end">✓</IonText>}
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonModal>

        {/* Profile Edit Modal */}
        <IonModal isOpen={showProfileEditModal} onDidDismiss={() => setShowProfileEditModal(false)} dir="rtl">
          <IonHeader>
            <IonToolbar>
              <IonTitle>تعديل الملف الشخصي</IonTitle>
              <IonButton slot="start" onClick={() => setShowProfileEditModal(false)} fill="clear">
                <IonIcon icon={chevronBackOutline} />
              </IonButton>
              <IonButton slot="end" onClick={handleProfileUpdate} disabled={isSaving}>
                {isSaving ? <IonSpinner name="dots" /> : 'حفظ'}
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div className="ion-text-center ion-margin-bottom">
              <IonAvatar style={{ width: '100px', height: '100px', margin: '10px auto' }}>
                <img src={newProfileData.profilePicture} alt="Profile" />
              </IonAvatar>
              <IonButton fill="clear" size="small">تغيير صورة الملف الشخصي</IonButton>
            </div>

            <IonList inset>
              <IonItem>
                <IonIcon icon={personCircleOutline} slot="start" color="medium" />
                <IonLabel position="floating">الاسم</IonLabel>
                <IonInput
                  name="name"
                  value={newProfileData.name}
                  onIonChange={handleProfileInputChange}
                  required
                />
              </IonItem>

              <IonItem>
                <IonIcon icon={mailOutline} slot="start" color="medium" />
                <IonLabel position="floating">البريد الإلكتروني</IonLabel>
                <IonInput
                  name="email"
                  value={newProfileData.email}
                  onIonChange={handleProfileInputChange}
                  type="email"
                  required
                  disabled // Email is usually immutable or changed via a security section
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">السيرة الذاتية (Bio)</IonLabel>
                <IonTextarea
                  name="bio"
                  value={newProfileData.bio}
                  onIonChange={handleProfileInputChange}
                  rows={3}
                  placeholder="اكتب شيئًا عن نفسك..."
                />
              </IonItem>
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

// Simple component for Item Divider (optional, to keep it clean)
const IonItemDivider = ({ children }) => (
  <IonItem lines="none" style={{ marginTop: '10px' }}>
    <IonLabel color="medium" style={{ marginInlineStart: '0' }}>
      {children}
    </IonLabel>
  </IonItem>
);

export default SettingsPage;