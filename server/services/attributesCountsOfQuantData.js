import selectQuantitativeData from "./selectQuantitativeData.js";

function transformData(data) {
  const result = Object.keys(data).map((key) => ({
    label: key,
    data: Object.values(data[key]),
  }));
  return result;
}

const attributesCountsOfQuantData = async (req, res) => {
  try {
    const rows = await selectQuantitativeData();
    const attributeCounts = {
      food_quality: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      cleanliness: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      menu_variety: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      staff_friendliness: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      // age: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      length_of_stay: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      overall_satisfaction: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };

    // Iterate through each feedback and count the occurrences of each rating for each attribute
    rows.forEach((feedback) => {
      Object.keys(feedback).forEach((attribute) => {
        const rating = feedback[attribute];
        if (rating >= 1 && rating <= 5) {
          attributeCounts[attribute][rating]++;
        }
      });
    });
    const transformedData = transformData(attributeCounts);
    console.log(transformedData);

    res.send({ data: transformedData });
  } catch (error) {
    console.log("Error in getting attributes count data:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default attributesCountsOfQuantData;
