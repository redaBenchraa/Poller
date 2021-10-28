import { useState } from 'react';
import Service from 'models/service';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'app/hooks';
import {
  deleteService,
  addService,
  editService,
} from 'features/serviceList/serviceSlice';

import './Item.scss';
import i18n from 'i18n/i18n';
export const Item = ({
  service,
  isEdit = false,
  isCreate = false,
  toggleEdit,
}: {
  service?: Service;
  isEdit?: boolean;
  isCreate?: boolean;
  toggleEdit: (id: string) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [url, setUrl] = useState<string>(service?.url ?? '');
  const [name, setName] = useState<string>(service?.name ?? '');

  const add = () => {
    dispatch(addService({ name: name, url: url }));
    setName('');
    setUrl('');
  };

  const deleteItem = () => {
    dispatch(deleteService(service!));
  };

  const edit = () => {
    dispatch(
      editService({
        ...service!,
        url,
        name,
      })
    );
    toggleEdit(service?.id ?? '');
  };

  return !isEdit ? (
    <tr className="fade-in">
      <td>{service?.name}</td>
      <td>{service?.url}</td>
      <td>
        <div className={`circle ${service!.alive ? 'green' : 'red'}`}></div>
      </td>
      <td>
        {new Date(
          Date.parse(service?.creationTime?.toString() ?? '')
        ).toLocaleString(i18n.language)}
      </td>
      <td className="actions">
        <button
          disabled={!url || !name}
          className="button"
          onClick={() => toggleEdit(service?.id ?? '')}
        >
          {t('Edit')}
        </button>
        <button className="button" onClick={deleteItem}>
          {t('Delete')}
        </button>
      </td>
    </tr>
  ) : (
    <tr>
      <td>
        <input
          value={name}
          placeholder={t('Name')}
          onChange={(e) => setName(e.target.value.trim())}
        />
      </td>
      <td>
        <input
          value={url}
          placeholder={t('Url')}
          onChange={(e) => setUrl(e.target.value.trim())}
        />
      </td>
      <td>
        {!isCreate && (
          <div className={`circle ${service!.alive ? 'green' : 'red'}`}></div>
        )}
      </td>
      <td>{service?.creationTime ?? ''}</td>
      <td className="actions">
        <button
          disabled={!name || !url}
          className="button"
          onClick={isCreate ? add : edit}
        >
          {t(isCreate ? 'Create' : 'Validate')}
        </button>
      </td>
    </tr>
  );
};
