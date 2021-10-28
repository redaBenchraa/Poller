import { useTranslation } from 'react-i18next';
import { languages } from 'i18n/i18n';
import './Settings.scss';
export function Settings() {
  const { t, i18n } = useTranslation();
  return (
    <div className="fields">
      <div className="field">
        <div className="label">{t('Language')}</div>
        <select
          className="value"
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          <option value={languages.English}>{t('English')}</option>
          <option value={languages.French}>{t('French')}</option>
        </select>
      </div>
    </div>
  );
}
