import { useTranslation } from 'react-i18next';
import './Modal.scss';
export const Modal = ({
  isOpen,
  close,
  title,
  children,
}: {
  isOpen: boolean;
  close: () => void;
  title: string;
  children?: JSX.Element;
}) => {
  const { t } = useTranslation();
  return isOpen ? (
    <>
      <div className="screen" onClick={close}></div>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="top">
          <div>{t(title)}</div>
          <div className="close" onClick={close}>
            X
          </div>
        </div>
        {children}
      </div>
    </>
  ) : (
    <></>
  );
};
