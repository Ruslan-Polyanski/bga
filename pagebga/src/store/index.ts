import { createStore, combineReducers, applyMiddleware } from 'redux';
import { getData } from '../api';
import { Dispatch } from 'redux';
import thunk from 'redux-thunk';

interface Data {
  type: string;
  payload: any;
}

export interface DataItem {
  additionalInfo: string;
  countPodgroups: string;
  course: string;
  exam: boolean;
  groupName: string;
  laboratoryHours: string;
  lecturesHours: string;
  offset: boolean;
  podgroups: Podgroups[];
  practicHours: string;
  semestr: string;
  seminarHours: string;
  studentsNumber: string;
  subjectName: string;
  uniqueId: string;
}

export interface Podgroups {
  countStudents: string;
  examTeacher: string;
  laboratoryTeacher: string;
  lectureTeacher: string;
  offsetTeacher: string;
  practiceTeacher: string;
  seminarTeacher: string;
}

export interface Teacher {
  id: string;
  name: string;
}

interface Teachers {
  type: string;
  payload: Teacher[];
}

const dataReducer = (state = [], action: Data) => {
  switch (action.type) {
    case 'ADD_DATA':
      return [...action.payload];
    case 'ADD_PODGROUP': {
      const newPodgroup = {
        countStudents: '',
        examTeacher: '',
        laboratoryTeacher: '',
        lectureTeacher: '',
        offsetTeacher: '',
        practiceTeacher: '',
        seminarTeacher: '',
      }
      const newState = structuredClone(state);
      newState.map((item: any) => {
        if(item.uniqueId === action.payload){
          item.podgroups.push(newPodgroup)
          const num = +item.podgroups[0].countStudents;
          item.podgroups[0].countStudents = num/2 + '';
          item.podgroups[1].countStudents = num/2 + '';
        }
        return item;
      })
      return newState;
    }
    case 'DELETE_PODGROUP': {
      const newState = structuredClone(state);
      newState.map((item: any) => {
        if(item.uniqueId === action.payload[0]){
          const numOne = +item.podgroups[0].countStudents;
          const numTwo = +item.podgroups[1].countStudents;
          const result = numOne + numTwo;
          item.podgroups.pop()
          item.podgroups[0].countStudents = result + '';
        }
        return item;
      })   
      return newState;
    }
    case 'RECOUNT': {
      const newState = structuredClone(state);
      newState.map((item: any) => {
        if(item.uniqueId === action.payload[0]){
          const numPodgroup = action.payload[1];
          item.podgroups[numPodgroup].countStudents = action.payload[2] + '';
          const count = +item.studentsNumber - +item.podgroups[numPodgroup].countStudents;
          action.payload[1] === 0 
              ? item.podgroups[1].countStudents = count + '' 
              : item.podgroups[0].countStudents = count + ''
        }
        return item;
      })  
      return newState;
    }
    case 'SET_TEACHER': {
      const newState = structuredClone(state);
      newState.map((item: any) => {
        if(item.uniqueId === action.payload.uniqueId){
          const numPodgroup = action.payload.podgroup;
          const category = action.payload.categoryTeacher;
          const id = action.payload.idTeacher;
          if(id === "vacancy") {
            item.podgroups[numPodgroup][category] = '';
          } else {
            item.podgroups[numPodgroup][category] = id;
          }
        }
        return item;
      })  
      return newState;
    }
    case 'SET_ALL_TEACHER': {
      let result;
      const newState = structuredClone(state);
      newState.map((item: any) => {
        if(item.uniqueId === action.payload.uniqueId){
          const numPodgroup = action.payload.index;
          const text = item.podgroups[numPodgroup].lectureTeacher;
          if(text === ''){
            result = false;
          }
          if(text !== ''){
            if(+item.laboratoryHours){
              item.podgroups[numPodgroup].laboratoryTeacher = structuredClone(text);
            }
            if(+item.practicHours){
              item.podgroups[numPodgroup].practiceTeacher = structuredClone(text);
            }
            if(+item.seminarHours){
              item.podgroups[numPodgroup].seminarTeacher = structuredClone(text);
            }
            if(item.exam){
              item.podgroups[numPodgroup].examTeacher = structuredClone(text);
            }
            if(item.offset){
              item.podgroups[numPodgroup].offsetTeacher = structuredClone(text);
            }
            result = true;
          }
        }
        return item;
      })  
      return result ? newState : state;
    }
    default:
      return state;
  }
};

const teachersReducer = (state = [], action: Teachers) => {
  switch (action.type) {
    case 'ADD_TEACHERS':
      return [...action.payload];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  data: dataReducer, 
  teachers: teachersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const addDataAC = (payload: Data) => {
  return {
    type: 'ADD_DATA',
    payload
  }
};

const addPodgroupAC = (payload: string) => {
  return {
    type: 'ADD_PODGROUP',
    payload
  }
};

const recountAC = (payload: [string, number, string]) => {
  return {
    type: 'RECOUNT',
    payload
  }
};

const setTeacherAC = (payload: {uniqueId: string, podgroup: number, categoryTeacher: string, idTeacher: string }) => {
  return {
    type: "SET_TEACHER",
    payload
  }
};

const setAllTeacherAC = (payload: {uniqueId: string, podgroup: number}) => {
  return {
    type: 'SET_ALL_TEACHER',
    payload
  }
};


const deletePodgroupAC = (payload: [string, number]) => {
  return {
    type: 'DELETE_PODGROUP',
    payload
  }
};

const addTeachersAC = (payload: Teachers) => {
  return {
    type: 'ADD_TEACHERS',
    payload
  }
};

const addDataTC = (): any => {
  return async (dispatch: Dispatch) => {
    const response = await getData();
    dispatch(addDataAC(response.data))
    dispatch(addTeachersAC(response.teachers))
  }
};

const addPodgroupTC = (uniqueId: string): any => {
  return (dispatch: Dispatch) => {
    dispatch(addPodgroupAC(uniqueId))
  }
}

const deletePodgroupTC = (uniqueId: string, index: number): any => {
  return (dispatch: Dispatch) => {
    dispatch(deletePodgroupAC([uniqueId, index]))
  }
}

const recountTC = (uniqueId: string, index: number, event: any): any => {
  return (dispatch: Dispatch) => {
    dispatch(recountAC([uniqueId, index, event]))
  }
}

const setTeacherTC = (data: any): any => {
  return (dispatch: Dispatch) => {
    dispatch(setTeacherAC(data))
  }
}

const setAllTeacherTC = (data: any): any => {
  return (dispatch: Dispatch) => {
    dispatch(setAllTeacherAC(data))
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, addDataTC, addPodgroupTC, deletePodgroupTC, recountTC, setTeacherTC, setAllTeacherTC}
