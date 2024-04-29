import { Student, IStudent } from './../models/Student'

// Define a function to count students by gender
export async function countStudentsByGender(): Promise<{ boys: number; girls: number }> {
  try {
    // Use Mongoose aggregate method to count students by gender
    const result = await Student.aggregate([
      {
        $group: {
          _id: '$studentGender',
          count: { $sum: 1 },
        },
      },
    ]).exec();

    // Initialize counts
    let boys = 0;
    let girls = 0;

    // Iterate over aggregation result
    result.forEach((item: any) => {
      if (item._id === 'boy') {
        boys = item.count;
      } else if (item._id === 'girl') {
        girls = item.count;
      }
    });

    return { boys, girls };
  } catch (error) {
    // Handle error
    console.error('Error counting students by gender:', error);
    throw error;
  }
}

// // Example usage:
// countStudentsByGender()
//   .then(({ boys, girls }) => {
//     console.log(`Number of boys: ${boys}`);
//     console.log(`Number of girls: ${girls}`);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
