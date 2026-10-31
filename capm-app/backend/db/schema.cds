namespace com.demo.requests;

using { cuid, managed } from '@sap/cds/common';

type Priority : String(10) enum { Low; Medium; High; }
type Status   : String(20) enum { New; InProgress; Done; }

entity Requests : cuid, managed {
  title       : String(100) @mandatory;
  description : String(1000);
  priority    : Priority default 'Medium';
  status      : Status   default 'New';
}
