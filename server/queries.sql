CREATE TABLE prescriptions (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  medication_name TEXT,
  dosage INT,
  how_often TEXT,
  time_of_day TIME,
  re_order TEXT,
  med_start DATE,
);

INSERT INTO prescriptions (medication_name, dosage, how_often, time_of_day, re_order, med_start) VALUES ('bing bong', '47', 'daily', '6:00','monthly', '2025-12-17');