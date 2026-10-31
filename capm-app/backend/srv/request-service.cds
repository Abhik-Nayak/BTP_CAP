using { com.demo.requests as db } from '../db/schema';

@path: '/odata/v4/request'
service RequestService {
  entity Requests as projection on db.Requests;
}
