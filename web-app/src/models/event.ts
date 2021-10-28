import Service from './service';

export interface ServiceEvent {
  type: 'create' | 'edit' | 'delete';
  source: Service;
}
