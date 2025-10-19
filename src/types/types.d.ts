import {connection} from 'mongoose';

declare global{
  var mongoose :{
    conn:Connection | null ,
    promise:Promise<connection> | null
  }
}
export{}