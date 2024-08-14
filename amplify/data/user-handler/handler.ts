export const handle = async (event: any) => {
    return {
        userId: event.arguments.userId,
        name: event.arguments.name,
        facilityEmail: event.arguments.facilityEmail,
        city: event.arguments.city,
        country: event.arguments.country,
        facilityName: event.arguments.facilityName,
        acceptHippa: event.arguments.acceptHippa,
    };
  };