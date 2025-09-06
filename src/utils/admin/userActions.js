import { Services } from "@/service";
import useModalStore from "@/store/useModalStore";

export const useUserActions = (router) => {
  const { asPath, pathname, query } = router;
  const toUserDetail = asPath.split("/").slice(0, 4).join("/");
  const { openModal, closeModal, setLoading } = useModalStore();

  const handleGender = (gender) => {
    if (gender === 0) {
      return {
        id: gender,
        name: "Male"
      };
    }
    else if (gender === 1) {
      return {
        id: gender,
        name: "Female"
      };
    }
    else {
       return {
        id: gender,
        name: ""
      };
    }
  }

  const handleRole = (role) => {
    if (role === 0) {
      return {
        id: role,
        name: "User"
      };
    }
    else if (role === 1) {
      return {
        id: role,
        name: "Admin"
      };
    }
    else if (role === 2) {
      return {
        id: role,
        name: "Super Admin"
      };
    }
  }

  const handleCreate = (data, callback) => {
    openModal(
      "Create User",
      "Are you sure you want to create this user?",
      async () => {
        try {
          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .post(`/api/post/users/`, data)
            .then((getResponse) => {
              const result = getResponse.data;

              if (result?.code === 200) {
                setLoading(false);
                closeModal();

                if (typeof callback === "function") {
                  callback(result);
                }
              }
            })
            .catch(() => {
              setLoading(false);
            });
        } catch (err) {
          setLoading(false);
        }
      }
    );
  }

  const handleUpdate = (id, data) => {
    console.log('update')
    openModal(
      "Update User",
      "Are you sure you want to change this user?",
      async () => {
        try {
          console.log('Open Modal');

          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .put(`/api/put/users/` + id, data)
            .then((getResponse) => {
              const result = getResponse.data;

              if (result) {
                if (result.code === 200) {
                  setLoading(false);
                  closeModal();
                  router.replace(toUserDetail);
                }
              }
            })
            .catch((error) => {
              setLoading(false);
            });
        } catch (err) { }
      }
    );
  }

  const handleSoftDelete = (id, callback) => {
    openModal(
      "Delete User",
      "Are you sure you want to delete this user?",
      async () => {
        try {
          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .put(`/api/put/users/delete/` + id)
            .then((getResponse) => {
              const result = getResponse.data;

              if (result && result.code === 200) {
                setLoading(false);
                closeModal();

                if (typeof callback === "function") {
                  callback(result);
                }
              }
            })
            .catch(() => {
              setLoading(false);
            });
        } catch (err) {
          setLoading(false);
        }
      }
    );
  };

  const handleRestore = (id, callback) => {
    openModal(
      "Restore User",
      "Are you sure you want to restore this user?",
      async () => {
        try {
          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .put(`/api/put/users/restore/` + id)
            .then((getResponse) => {
              const result = getResponse.data;

              if (result?.code === 200) {
                setLoading(false);
                closeModal();

                if (typeof callback === "function") {
                  callback(result);
                }
              }
            })
            .catch(() => {
              setLoading(false);
            });
        } catch (err) {
          setLoading(false);
        }
      }
    );
  };

  const handleHardDelete = (id, callback) => {
    openModal(
      'Delete User',
      'Are you absolutely sure you want to permanently delete this user? This action cannot be undone and may cause inconsistencies in user data.',
      async () => {
        try {
          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .delete(`/api/delete/users/` + id)
            .then((getResponse) => {
              const result = getResponse.data;

              if (result) {
                if (result.code === 200) {
                  setLoading(false);
                  closeModal();

                  if (typeof callback === "function") {
                    callback(result);
                  }
                }
              }
            })
            .catch((error) => {
              setLoading(false);
            });
        } catch (err) { }
      });
  };

  return { handleRole, handleGender, handleCreate, handleUpdate, handleSoftDelete, handleRestore, handleHardDelete };
};