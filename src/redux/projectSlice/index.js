import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';
import { addCaseWithLoading } from '../../utils/helpers';

const initialState = {
  projects: [],
  total: 0,
  results: 0,
  singleProject: null,
  isLoading: false,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setSingleProjectNull: (state) => {
      state.singleProject = null;
    },
  },

  extraReducers: (builder) => {
    addCaseWithLoading(builder, Actions.addProjectAdmin, {
      onCompleted: (state, action) => {
        state.projects.push(action.payload);
      },
    });

    addCaseWithLoading(builder, Actions.addProject, {
      onCompleted: (state, action) => {
        state.projects.push(action.payload);
      },
    });
    //
    //
    //

    addCaseWithLoading(builder, Actions.getAllProjects, {
      onCompleted: (state, action) => {
        state.projects = action.payload.data;
        state.total = action.payload.total;
        state.results = action.payload.results;
      },
    });

    addCaseWithLoading(builder, Actions.getUserProjects, {
      onCompleted: (state, action) => {
        state.projects = action.payload.data;
        state.total = action.payload.total;
        state.results = action.payload.results;
      },
    });
    //
    //
    //
    addCaseWithLoading(builder, Actions.updateProjectAdmin, {
      onCompleted: (state, action) => {
        state.projects = state.projects.map((project) =>
          project._id === action.payload._id ? { ...project, ...action.payload } : project,
        );
      },
      onReject: (state) => {
        state.isLoading = false;
      },
    });

    addCaseWithLoading(builder, Actions.updateProject, {
      onCompleted: (state, action) => {
        state.projects = state.projects.map((project) =>
          project._id === action.payload._id ? { ...project, ...action.payload } : project,
        );
      },
      onReject: (state) => {
        state.isLoading = false;
      },
    });
    //
    //
    //
    addCaseWithLoading(builder, Actions.getOneProjectAdmin, {
      onCompleted: (state, action) => {
        state.singleProject = action.payload.data;
      },
    });
    addCaseWithLoading(builder, Actions.getOneProject, {
      onCompleted: (state, action) => {
        state.singleProject = action.payload.data;
      },
    });
    //
    //
    //
    addCaseWithLoading(builder, Actions.deleteProjectAdmin, {
      onCompleted: (state, action) => {
        state.projects = state.projects.filter((e) => e._id !== action.payload);
      },
    });

    addCaseWithLoading(builder, Actions.deleteProject, {
      onCompleted: (state, action) => {
        state.projects = state.projects.filter((e) => e._id !== action.payload);
      },
    });
  },
});

export const {
  addProjectAdmin,
  getAllProjects,
  updateProjectAdmin,
  deleteProjectAdmin,
  getOneProjectAdmin,
  deleteProject,
  getUserProjects,
  addProject,
  getOneProject,
  updateProject,
} = Actions;
export const { setSingleProjectNull } = projectSlice.actions;
export default projectSlice.reducer;
