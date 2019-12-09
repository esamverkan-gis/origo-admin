const baseUrl = process.env.API_URL;

export const serverUrl = baseUrl + '/admin';

function json(response) {
  return response.json();
}

function error(error) {
  return { success: false, serverResponse: error };
}

export const baseFetch = (objektId, api, parameters = '', felmeddelande = 'Något gick fel när objektet skulle hämtas, försök igen senare.') => {
  return fetch((api + objektId + parameters), {
    headers: {
      'Accept': 'application/json',
    }
  })
    .then(json)
    .then((response) => {
      if (response.exceptionMessage) {
        let error = new Error(response.exceptionMessage);
        throw error;
      }
      if (response.message) {
        let error = new Error(felmeddelande);
        throw error;
      }
      return { success: true, serverResponse: response };
    });
};

export const basePostFormAsMultiData = (form, felmeddelande = 'Något gick fel när objektet skulle sparas (POST), försök igen senare.') => {
  // 1.2 Form Data
  // We need to properly format the submitted fields.
  // Here we will use the same format the browser submits POST forms.
  // You could use a different format, depending on your server, such
  // as JSON or XML.
  var formData = new FormData(form);
  /*
  for (var i = 0; i < form.elements.length; ++i) {
      formData.append(form.elements[i].name, form.elements[i].value);
  }*/
  const api = serverUrl + '/importConfig';
  return fetch((api), {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
    body: formData
  }).then(json)
    .then((response) => {
      if (response.exceptionMessage) {
        let error = new Error(response.exceptionMessage);
        throw error;
      }
      if (response.message) {
        let error = new Error(felmeddelande);
        throw error;
      }
      return { success: true, serverResponse: response };
    });
};

export const basePost = (postBody, api, felmeddelande = 'Något gick fel när objektet skulle sparas (POST), försök igen senare.') => {
  return fetch((api), {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postBody)
  })
    .then(json)
    .then((response) => {
      if (response.exceptionMessage) {
        let error = new Error(response.exceptionMessage);
        throw error;
      }
      if (response.message) {
        let error = new Error(felmeddelande);
        throw error;
      }
      return { success: true, serverResponse: response };
    });
};

export const basePut = (objektId, putBody, api, felmeddelande = 'Något gick fel när objektet skulle sparas (PUT), försök igen senare.') => {
  return fetch((api + objektId), {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(putBody)
  })
    .then(json)
    .then((response) => {
      if (response.exceptionMessage) {
        let error = new Error(response.exceptionMessage);
        throw error;
      }
      if (response.message) {
        let error = new Error(felmeddelande);
        throw error;
      }
      return { success: true, serverResponse: response };
    });
};

export const baseDel = (objektId, api, felmeddelande = 'Något gick fel när objektet skulle tas bort, försök igen senare.') => {
  return fetch((api + objektId), {
    method: 'DELETE',
  })
    .then(json)
    .then((response) => {
      if (response.exceptionMessage) {
        let error = new Error(response.exceptionMessage);
        throw error;
      }
      if (response.message) {
        let error = new Error(felmeddelande);
        throw error;
      }
      return { success: true, serverResponse: response };
    })
    .catch((err) => {
      console.log(err);
    });
};
/*
export const basePost = (postDO: any, api: string, felmeddelande: string = 'Något gick fel när data skulle postas, försök igen senare.'): Promise<IResponseObject> => {
    return fetch((api), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'spraak': getRouteName()
        },
        body: JSON.stringify(postDO),
    })
        .then(json)
        .then((response: any) => {
            if (response.exceptionMessage) {
                let error = new Error(response.exceptionMessage);
                throw error;
            }
            if (response.message) {
                let error = new Error(felmeddelande);
                throw error;
            }
            return { success: true, serverResponse: response } as IResponseObject;
        });
};
*/
export const fetchConfig = (objectId) => {
  return baseFetch(objectId, serverUrl + '/config/');
};

export const apiPostForm = (form) => {
  return basePostFormAsMultiData(form);
}

export const apiPostConfig = config => {
  return basePost(config, serverUrl + '/config');
}

export const apiPutConfig = config => {
  return basePut(config.id, config, serverUrl + '/config/');
}

export const apiPostSource = source => {
  return basePost(source, serverUrl + '/source');
}

export const apiPutSource = source => {
  return basePut(source.id, source, serverUrl + '/source/');
}

export const apiDelConfig = id => {
  return baseDel(id, serverUrl + '/config/');
}

export const apiRemoveConfigGraph = id => {
  return baseDel(id, serverUrl + '/domain/removeConfigGraph/');
}

export const apiFetchConfigStyles = id => {
  return baseFetch(id, serverUrl + '/domain/fetchConfigStyles/');
}

export const apiFetchConfigs = () => {
  return baseFetch('', serverUrl + '/config');
};

export const apiFetchControls = () => {
  return baseFetch('', serverUrl + '/control');
};

export const apiFetchConfigControls = (configId) => {
  return baseFetch('', serverUrl + '/control', '?configId=' + configId);
};

export const apiFetchProj4defs = () => {
  return baseFetch('', serverUrl + '/proj4defs');
};

export const apiFetchLayers = () => {
  return baseFetch('', serverUrl + '/layer');
};

export const apiFetchConfigLayers = (configId) => {
  return baseFetch('', serverUrl + '/layer', '?configId=' + configId);
};

export const apiFetchConfigGroups = (configId) => {
  return baseFetch('', serverUrl + '/group', '?configId=' + configId);
};

export const apiUpdateTreeStructure = (data) => {
  return basePost({ data }, serverUrl + "/domain/updateTreeStructure");
}

export const apiSaveVisibilityStatus = (data) => {
  return basePost({ data }, serverUrl + "/domain/saveVisibilityStatus");
}

export const apiExportConfigAsJson = id => {
  var a = document.createElement('a');
  a.download = "backup.json";
  a.href = serverUrl + "/exportConfig/" + id
  a.textContent = "Download backup.json";
  a.click();
  //return baseFetch(id, serverUrl + '/exportConfig/');
}
export const apiFetchSources = () => {
  return baseFetch('', serverUrl + '/source');
};

export const apiFetchLayersForASource = source => {
  return basePost(source, serverUrl + '/getLayersFromCapabilities');
}

export const apiPostLayer = layer => {
  return basePost(layer, serverUrl + '/layer');
}

export const apiPutLayer = layer => {
  return basePut(layer.id, layer, serverUrl + '/layer/');
}

// this is called apiPostAttribute(s) because we tend to send several attributes with each call
export const apiPostAttributes = attributes => {
  return basePost(attributes, serverUrl + '/attribute');
}

// this function is not used now. only Post and Delete for attributes.
export const apiPutAttributes = attributes => {
  let arrayOfResponses = attributes.map(attribute => {
    return basePut(attribute.id, attribute, serverUrl + '/attribute/');
  });
  // TODO: needs to tested
  return Promise.all(arrayOfResponses);
  // .then( go through server responses maybe and fix a new response);
}

export const apiFetchLayerAttributesFromDatabase = layer => {
  return baseFetch('', serverUrl + '/attribute', '?layerId=' + layer.id);
}

export const apiFetchLayerAttributesFromServer = (layerName, source) => {
  return basePost({ source, layerName }, serverUrl + '/domain/fetchAttributeFromServer');
}

export const apiUpdateGroupAndLayerTreeInformation = (itemsToUpdate) => {
  return basePost({ itemsToUpdate }, serverUrl + "/domain/updateGroupAndLayerTreeInformation");
}

export const apiDelAttribute = id => {
  return baseDel(id, serverUrl + '/attribute/');
}

// export const apiFetchLayersAndGroups = (configId) => {
//     return baseFetch(configId, serverUrl + '/domain/fetchLayersAndGroups/');
// }

export const apiDelGroup = id => {
  return baseDel(id, serverUrl + '/group/');
}

export const apiPostGroup = group => {
  return basePost(group, serverUrl + '/group/');
}

export const apiPutGroup = group => {
  return basePut(group.id, group, serverUrl + '/group/');
}

export const apiFetchStyle = id => {
  return baseFetch(id, serverUrl + '/style/');
}

export const apiPostStyle = style => {
  return basePost(style, serverUrl + '/style/');
}

export const apiPutStyle = style => {
  return basePut(style.id, style, serverUrl + '/style/');
}

export const apiDelLayer = id => {
  return baseDel(id, serverUrl + '/layer/');
}

export const apiRemoveLayerGraph = id => {
  return baseDel(id, serverUrl + '/domain/removeLayerGraph/');
}

export const apiDelControl = id => {
  return baseDel(id, serverUrl + '/control/');
}

export const apiPostControl = control => {
  return basePost(control, serverUrl + '/control');
}

export const apiPutControl = control => {
  return basePut(control.id, control, serverUrl + '/control/');
}