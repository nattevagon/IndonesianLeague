import { Services } from "@/service";
import useModalStore from "@/store/useModalStore";
import { useValidators } from "./validators";

export const useCompetitionActions = (router) => {
  const { asPath, pathname, query } = router;
  const { openModal, closeModal, setLoading } = useModalStore();
  const {
    validationName,
    validationSelect
  } = useValidators();

  const handleIsPublish = (isPublish) => {
    if (isPublish === 0) {
      return {
        id: isPublish,
        name: "False"
      };
    }
    else if (isPublish === 1) {
      return {
        id: isPublish,
        name: "True"
      };
    }
  }

  const handleCreate = (data, callback) => {
    openModal(
      "Create Competition",
      "Are you sure you want to create this competition?",
      async () => {
        try {
          if (validationName(data?.name, 6)) {
            if (typeof callback === "function") {
              const callbackData = {
                status: false,
                name: 'name',
                message: validationName(data?.name, 6)
              }
              closeModal();
              callback(callbackData);
            }
            return;
          }

          if (validationSelect(data?.division)) {
            if (typeof callback === "function") {
              const callbackData = {
                status: false,
                name: 'division',
                message: validationSelect(data?.division)
              }
              closeModal();
              callback(callbackData);
            }
            return;
          }

          if (validationSelect(data?.is_publish)) {
            if (typeof callback === "function") {
              const callbackData = {
                status: false,
                name: 'is_publish',
                message: validationSelect(data?.is_publish)
              }
              closeModal();
              callback(callbackData);
            }
            return;
          }

          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .post(`/api/post/competitions/`, data)
            .then((getResponse) => {
              const result = getResponse.data;

              if (result?.code === 200) {
                setLoading(false);
                closeModal();

                if (typeof callback === "function") {
                  const callbackData = {
                    status: true,
                    message: result.message
                  }
                  callback(callbackData);
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

  const handleUpdate = (id, data, callback) => {
    console.log('update')
    openModal(
      "Update Competition",
      "Are you sure you want to change this competition?",
      async () => {
        try {
          if (validationName(data?.name, 6)) {
            if (typeof callback === "function") {
              const callbackData = {
                status: false,
                name: 'name',
                message: validationName(data?.name, 6)
              }
              closeModal();
              callback(callbackData);
            }
            return;
          }

          if (validationSelect(data?.division)) {
            if (typeof callback === "function") {
              const callbackData = {
                status: false,
                name: 'division',
                message: validationSelect(data?.division)
              }
              closeModal();
              callback(callbackData);
            }
            return;
          }

          if (validationSelect(data?.is_publish)) {
            if (typeof callback === "function") {
              const callbackData = {
                status: false,
                name: 'is_publish',
                message: validationSelect(data?.is_publish)
              }
              closeModal();
              callback(callbackData);
            }
            return;
          }

          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .put(`/api/put/competitions/` + id, data)
            .then((getResponse) => {
              const result = getResponse.data;

              if (result) {
                if (result.code === 200) {
                  setLoading(false);
                  closeModal();

                  if (typeof callback === "function") {
                    const callbackData = {
                      status: true,
                      message: result.message
                    }
                    callback(callbackData);
                  }
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
      "Delete Competition",
      "Are you sure you want to delete this competition?",
      async () => {
        try {
          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .put(`/api/put/competitions/delete/` + id)
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
      "Restore Competition",
      "Are you sure you want to restore this competition?",
      async () => {
        try {
          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .put(`/api/put/competitions/restore/` + id)
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
      'Delete Competition',
      'Are you absolutely sure you want to permanently delete this competition? This action cannot be undone and may cause inconsistencies in competition data.',
      async () => {
        try {
          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .delete(`/api/delete/competitions/` + id)
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

  return { handleIsPublish, handleCreate, handleUpdate, handleSoftDelete, handleRestore, handleHardDelete };
};