import CardImg1 from "../assets/div.MuiBox-root.png";
import CardImg3 from "../assets/div.MuiBox-root (1).png";
import CardImg4 from "../assets/div.MuiBox-root (2).png";
import CardImg2 from "../assets/iconly-glass-discount.svg.png";

import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { GetToken } from "../../utils/axios";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [showInteractionArea, setShowInteractionArea] = useState(false);

  const settings = {
    height: 300,
    series: [
      {
        data: [10, 15, 12, 25, 35, 30, 38, 50, 45, 25, 25, 35],
      },
    ],
    xAxis: [
      {
        scaleType: "point",
        data: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    ],
  };

  const token = GetToken()
  const navigate = useNavigate()
  useEffect(() => {
    if (token && token.length < 200 || !token) {
      navigate("/")
    }
  })

  return (
    <div className="w-full p-[24px]">
      <h1 className="text-[#111927] font-bold text-[30px] mb-[24px]">
        Dashboard
      </h1>

      <div className="flex gap-[30px]">
        <div className="flex-1 w-[65%]">
          <div className="flex gap-[20px] mb-[30px]">
            <div className="flex items-center gap-[12px] bg-[#FEF3F2] w-[260px] h-[90px] rounded-[12px] px-[16px]">
              <img className="w-[50px]" src={CardImg1} />
              <div>
                <p className="text-[#6C737F] text-[14px] font-semibold">
                  Sales
                </p>
                <h1 className="text-[#111927] font-bold text-[24px]">$152k</h1>
              </div>
            </div>

            <div className="flex items-center gap-[12px] bg-[#FFF7ED] w-[260px] h-[90px] rounded-[12px] px-[16px]">
              <img className="w-[50px]" src={CardImg2} />
              <div>
                <p className="text-[#6C737F] text-[14px] font-semibold">Cost</p>
                <h1 className="text-[#111927] font-bold text-[24px]">$99.7k</h1>
              </div>
            </div>

            <div className="flex items-center gap-[12px] bg-[#ECFDF3] w-[260px] h-[90px] rounded-[12px] px-[16px]">
              <img className="w-[50px]" src={CardImg3} />
              <div>
                <p className="text-[#6C737F] text-[14px] font-semibold">
                  Profit
                </p>
                <h1 className="text-[#111927] font-bold text-[24px]">$32.1k</h1>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[12px] p-[20px] shadow-sm">
            <p className="text-[#111927] font-semibold mb-[10px]">
              Sales Revenue
            </p>

            <Box
              sx={{
                "& .interaction-area": showInteractionArea
                  ? { stroke: "lightgray", strokeOpacity: 0.3 }
                  : {},
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showInteractionArea}
                    onChange={(e) => setShowInteractionArea(e.target.checked)}
                  />
                }
                label="Show highlight area"
              />

              <LineChart {...settings} />
            </Box>
          </div>
        </div>

        <div className="w-[360px] bg-white rounded-[12px] p-[20px] shadow-sm">
          <div className="flex justify-between items-center mb-[16px]">
            <h1 className="text-[#111927] font-bold text-[18px]">
              Top selling products
            </h1>
            <span className="text-[#2563EB] text-[14px] cursor-pointer">
              See All
            </span>
          </div>
          <div className="flex gap-[3px] mt-[20px]">
            <div>
              <img className="w-[45px]" src={CardImg4} alt="Top products" />
            </div>
            <div>
              <p className="text-[#111927] font-semibold">
                Healthcare Erbology
              </p>
              <p className="text-[#6C737F] font-light">in Accessories</p>
            </div>
            <div className="ml-[15px]">
              <p className="text-[#10B981]">13,153</p>
              <p className="text-[#6C737F]">in sales</p>
            </div>
          </div>
          <div className="flex gap-[3px] mt-[10px]">
            <div>
              <img className="w-[45px]" src={CardImg4} alt="Top products" />
            </div>
            <div>
              <p className="text-[#111927] font-semibold">
                Healthcare Erbology
              </p>
              <p className="text-[#6C737F] font-light">in Accessories</p>
            </div>
            <div className="ml-[15px]">
              <p className="text-[#10B981]">13,153</p>
              <p className="text-[#6C737F]">in sales</p>
            </div>
          </div>
          <div className="flex gap-[3px] mt-[10px]">
            <div>
              <img className="w-[45px]" src={CardImg4} alt="Top products" />
            </div>
            <div>
              <p className="text-[#111927] font-semibold">
                Healthcare Erbology
              </p>
              <p className="text-[#6C737F] font-light">in Accessories</p>
            </div>
            <div className="ml-[15px]">
              <p className="text-[#10B981]">13,153</p>
              <p className="text-[#6C737F]">in sales</p>
            </div>
          </div>
          <div className="flex gap-[3px] mt-[10px]">
            <div>
              <img className="w-[45px]" src={CardImg4} alt="Top products" />
            </div>
            <div>
              <p className="text-[#111927] font-semibold">
                Healthcare Erbology
              </p>
              <p className="text-[#6C737F] font-light">in Accessories</p>
            </div>
            <div className="ml-[15px]">
              <p className="text-[#10B981]">13,153</p>
              <p className="text-[#6C737F]">in sales</p>
            </div>
          </div>
          <div className="flex gap-[3px] mt-[10px]">
            <div>
              <img className="w-[45px]" src={CardImg4} alt="Top products" />
            </div>
            <div>
              <p className="text-[#111927] font-semibold">
                Healthcare Erbology
              </p>
              <p className="text-[#6C737F] font-light">in Accessories</p>
            </div>
            <div className="ml-[15px]">
              <p className="text-[#10B981]">13,153</p>
              <p className="text-[#6C737F]">in sales</p>
            </div>
          </div>
          <div className="flex gap-[3px] mt-[10px]">
            <div>
              <img className="w-[45px]" src={CardImg4} alt="Top products" />
            </div>
            <div>
              <p className="text-[#111927] font-semibold">
                Healthcare Erbology
              </p>
              <p className="text-[#6C737F] font-light">in Accessories</p>
            </div>
            <div className="ml-[15px]">
              <p className="text-[#10B981]">13,153</p>
              <p className="text-[#6C737F]">in sales</p>
            </div>
          </div>
          <div className="flex gap-[3px] mt-[10px]">
            <div>
              <img className="w-[45px]" src={CardImg4} alt="Top products" />
            </div>
            <div>
              <p className="text-[#111927] font-semibold">
                Healthcare Erbology
              </p>
              <p className="text-[#6C737F] font-light">in Accessories</p>
            </div>
            <div className="ml-[15px]">
              <p className="text-[#10B981]">13,153</p>
              <p className="text-[#6C737F]">in sales</p>
            </div>
          </div>
          <div className="flex gap-[3px] mt-[10px]">
            <div>
              <img className="w-[45px]" src={CardImg4} alt="Top products" />
            </div>
            <div>
              <p className="text-[#111927] font-semibold">
                Healthcare Erbology
              </p>
              <p className="text-[#6C737F] font-light">in Accessories</p>
            </div>
            <div className="ml-[15px]">
              <p className="text-[#10B981]">13,153</p>
              <p className="text-[#6C737F]">in sales</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-[24px] mt-[30px]">
          <div className="bg-white rounded-[12px] p-[20px] shadow-sm">
            <h2 className="text-[#111927] font-semibold text-[16px] mb-[16px]">
              Recent Transactions
            </h2>

            <table className="w-full text-left">
              <thead>
                <tr className="text-[#6C737F] text-[13px]">
                  <th className="pb-[10px] font-medium">Name</th>
                  <th className="pb-[10px] font-medium">Date</th>
                  <th className="pb-[10px] font-medium">Amount</th>
                  <th className="pb-[10px] font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="text-[14px] text-[#111927]">
                <tr className="border-t">
                  <td className="py-[12px]">Jagarnath S.</td>
                  <td>24.05.2023</td>
                  <td>$124.97</td>
                  <td>
                    <span className="bg-[#ECFDF3] text-[#06A561] px-[10px] py-[4px] rounded-full text-[12px] font-medium">
                      Paid
                    </span>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="py-[12px]">Anand G.</td>
                  <td>23.05.2023</td>
                  <td>$55.42</td>
                  <td>
                    <span className="bg-[#F2F4F7] text-[#344054] px-[10px] py-[4px] rounded-full text-[12px] font-medium">
                      Pending
                    </span>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="py-[12px]">Kartik S.</td>
                  <td>23.05.2023</td>
                  <td>$89.90</td>
                  <td>
                    <span className="bg-[#ECFDF3] text-[#027A48] px-[10px] py-[4px] rounded-full text-[12px] font-medium">
                      Paid
                    </span>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="py-[12px]">Rakesh S.</td>
                  <td>22.05.2023</td>
                  <td>$14.94</td>
                  <td>
                    <span className="bg-[#F2F4F7] text-[#344054] px-[10px] py-[4px] rounded-full text-[12px] font-medium">
                      Pending
                    </span>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="py-[12px]">Anup S.</td>
                  <td>22.05.2023</td>
                  <td>$70.52</td>
                  <td>
                    <span className="bg-[#ECFDF3] text-[#027A48] px-[10px] py-[4px] rounded-full text-[12px] font-medium">
                      Paid
                    </span>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="py-[12px]">Jimmy P.</td>
                  <td>22.05.2023</td>
                  <td>$70.52</td>
                  <td>
                    <span className="bg-[#ECFDF3] text-[#027A48] px-[10px] py-[4px] rounded-full text-[12px] font-medium">
                      Paid
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-[12px] p-[20px] shadow-sm">
            <h2 className="text-[#111927] font-semibold text-[16px] mb-[16px]">
              Top Products by Units Sold
            </h2>

            <table className="w-full text-left">
              <thead>
                <tr className="text-[#6C737F] text-[13px]">
                  <th className="pb-[10px] font-medium">Name</th>
                  <th className="pb-[10px] font-medium">Price</th>
                  <th className="pb-[10px] font-medium text-right">Units</th>
                </tr>
              </thead>

              <tbody className="text-[14px] text-[#111927]">
                {[
                  ["Men Grey Hoodie", "$49.90", "204"],
                  ["Women Striped T-Shirt", "$34.90", "155"],
                  ["Women White T-Shirt", "$40.90", "120"],
                  ["Men White T-Shirt", "$49.90", "204"],
                  ["Women Red T-Shirt", "$34.90", "155"],
                ].map((item, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-[12px] flex items-center gap-[10px]">
                      <div className="w-[32px] h-[32px] bg-[#EEF2FF] rounded-[6px]" />
                      {item[0]}
                    </td>
                    <td>{item[1]}</td>
                    <td className="text-right">{item[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
