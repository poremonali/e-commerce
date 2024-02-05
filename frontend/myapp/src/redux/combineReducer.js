import {combineReducers} from 'redux';
import { userReducer1 } from "./userReducer1";

import itemreducer from './itemreducer';


export const combineReducer =combineReducers ({userReducer1:userReducer1,
    itemreducer:itemreducer,
    });

