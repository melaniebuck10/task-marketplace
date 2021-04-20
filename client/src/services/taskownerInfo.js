import api from './api';

export const loadTaskOwner = async (id) => {
  const response = await api.get(`/taskowner/${id}`);
  const { taskowner, tasksOfOwner } = response.data;
  return { taskowner, tasksOfOwner };
};

export const editProfile = async (id, data) => {
  const response = await api.patch(
    `http://localhost:3000/taskowner/${id}/edit`,
    data
  );
  return response.data.taskowner;
};

export const loadTaskApplicants = async (id) => {
  const response = await api.get(`task/${id}/getapplications`);
  console.log('RESPONSE', response);
  return response.data.applicants;
};

// TO BE FINETUNED
// export const updateApplications = async (id) => {
//   const response = await api.get(`task/${id}/updateApplications`);
//   return reponse.data.applications;
// };
