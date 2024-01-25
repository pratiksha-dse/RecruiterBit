export default {
    getCandidates: () => {
      return fetch("/candidate/candidates").then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized", msgError: true } };
      });
    },
    postCandidate: (candidate) => {
      console.log("doing1",candidate);
      return fetch("/candidate/addcandidate", {
        method: "post",
        body: JSON.stringify(candidate),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
      });
    },
    getCandidateByID: (id) => {
      console.log("fetching",id);
      return fetch("/candidate/getcandidatebyid", {
        method: "post",
        body: JSON.stringify({_id: id}),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
      });
    },
    editCandidate: (candidate, SEID) => {
      console.log("helo")
      return fetch("/candidate/editcandidate", {
        method: "post",
        body: JSON.stringify({SEID: SEID, candidate: candidate}),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
      });
    },
  };
  