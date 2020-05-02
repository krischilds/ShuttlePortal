export default class DataAccess {
  // TODO: using conig?
  static apiBase = "https://apis.msshuttleservices.com/MvApi/";

  static async getBuildingsAsync() {
    let response = await fetch(
      `${DataAccess.apiBase}api/Location/GetBuildingsList`
    );
    return await response.json();
  }

  static async getLiveBookingsAsync(building) {
    let query = !building ? "ALL" : building;
    let response = await fetch(
      `${DataAccess.apiBase}api/Reservation/GetLiveBookingsFromPickupBuildingName2/${query}`
    );
    return await response.json();
  }

  static async bookShuttleAsync(from, to, passengers, spaceType) {
    const alias = "shuttleportal";
    const apiUrl =
      DataAccess.apiBase +
      `api/Reservation/BookNextShuttle/${alias}/${from}/${to}/${spaceType}/${passengers}`;
    let response = await fetch(apiUrl, {
      method: "post",
    });
    return await response.json();
  }

  static async cancelShuttleAsync(confirmationNumber) {
    const apiUrl =
      DataAccess.apiBase +
      `api/Reservation/CancelSameDayTrip/${confirmationNumber}`;
    let response = await fetch(apiUrl, {
      method: "get",
    });
    return await response.json();
  }
}
