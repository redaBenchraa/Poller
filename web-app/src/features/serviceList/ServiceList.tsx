import { useAppSelector } from 'app/hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Item } from './item/Item';
import './ServiceList.scss';
import {
  loadServices,
  selectServices,
  subscribeToEvents,
} from './serviceSlice';
import { useAppDispatch } from 'app/hooks';

function ServiceList() {
  const [editMap, setEditMap] = useState<{ [key: string]: boolean }>({});
  const list = useAppSelector(selectServices);
  const { t } = useTranslation();
  const toggleEdit = (id: string) => {
    if (id) {
      setEditMap({ ...editMap, [id]: !editMap[id] ?? true });
    }
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    subscribeToEvents(dispatch);
    dispatch(loadServices());
  }, [dispatch]);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>{t('Name')}</th>
          <th>{t('Url')}</th>
          <th>{t('Status')}</th>
          <th>{t('Creation time')}</th>
          <th>{t('Actions')}</th>
        </tr>
      </thead>
      <tbody>
        {list.map((x) => (
          <Item
            key={x.id}
            service={x}
            isEdit={editMap[x.id ?? ''] === true}
            toggleEdit={toggleEdit}
          />
        ))}
      </tbody>
      <tfoot>
        <Item isEdit isCreate toggleEdit={toggleEdit} />
      </tfoot>
    </table>
  );
}

export default ServiceList;
