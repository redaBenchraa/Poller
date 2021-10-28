import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppNotification } from 'components/appNotification/AppNotification';
import { Modal } from 'components/modal/Modal';
import ServiceList from 'features/serviceList/ServiceList';
import './App.scss';
import { Settings } from 'features/settings/Settings';

function App() {
  const { t } = useTranslation();
  const [settingsOpen, setSettingOpen] = useState(false);
  return (
    <div className="App">
      <div className="settings" onClick={() => setSettingOpen(true)}>
        {t('Settings')}
      </div>
      <div className="title">{t('Service health checker')}</div>
      <ServiceList />
      <Modal
        title="Settings"
        isOpen={settingsOpen}
        close={() => setSettingOpen(false)}
      >
        <Settings />
      </Modal>
      <AppNotification />
    </div>
  );
}

export default App;
