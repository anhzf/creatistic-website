import url from 'app/utils/url';

const apiUrlFactory = (endpoint: string) => `https://dev.farizdotid.com/api/daerahindonesia/${endpoint}`;

const province = new Request(apiUrlFactory('provinsi'));

const city = function (provinceId: number) {
  const endpoint = url.buildQuery(apiUrlFactory('kota'), {
    id_provinsi: provinceId,
  });

  return new Request(endpoint.toString());
};

const district = function (cityId: number) {
  const endpoint = url.buildQuery(apiUrlFactory('kecamatan'), {
    id_kota: cityId,
  });

  return new Request(endpoint.toString());
};

const village = function (districtId: number) {
  const endpoint = url.buildQuery(apiUrlFactory('kelurahan'), {
    id_kecamatan: districtId,
  });

  return new Request(endpoint.toString());
};

export default {
  province,
  city,
  district,
  village,
};

export interface IProvinceData {
  id: number;
  nama: string;
}
