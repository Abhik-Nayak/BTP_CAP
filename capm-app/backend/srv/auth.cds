using { RequestService } from './request-service';

annotate RequestService with @(requires: ['Admin', 'User']);

annotate RequestService.Requests with @(restrict: [
  { grant: '*',      to: 'Admin' },
  { grant: 'CREATE', to: 'User' },
  { grant: 'READ',   to: 'User', where: 'createdBy = $user' }
]);