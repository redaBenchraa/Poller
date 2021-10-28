import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectIsOpen,
  selectMessage,
  selectType,
  hideAppNotification,
} from './appNotificationSlice';
import './AppNotification.scss';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function AppNotification() {
  const isOpen = useAppSelector(selectIsOpen);
  const message = useAppSelector(selectMessage);
  const type = useAppSelector(selectType);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  console.log('AppNotification');
  useEffect(() => {
    setTimeout(() => {
      dispatch(hideAppNotification());
    }, 3000);
  });
  const classes = `snackbar  ${type} ${isOpen ? 'show' : ''}`;
  return (
    <div className={classes}>
      <div>{t(message)}</div>
      <div onClick={() => dispatch(hideAppNotification())} className="close">
        <div>X</div>
      </div>
    </div>
  );
}
