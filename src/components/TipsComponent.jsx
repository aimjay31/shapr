import "../styles/TipsComponent.css";
import sunIcon from "../assets/icons/IcoSun.png";
import warnIcon from "../assets/icons/IcoWarn.png";

export default function TipsComponent() {
  const tipsData = [
    {
      type: "good",
      title: "Study Tip:",
      description: "Try studying in a quiet environment to maximize focus."
    },
    {
      type: "bad",
      title: "Low Productivity:",
      description: "Consider taking a short break. Your productivity has dipped recently."
    }
  ];

  return (
    <div className="panel tips">
      <div className="tips-head">Tips & Alerts</div>

      {tipsData.map((tip, index) => (
        <div className="tips-row" key={index}>
          <div className={`tips-ico ${tip.type}`}>
            <img
              src={tip.type === "good" ? sunIcon : warnIcon}
              alt="icon"
              className="mini"
            />
          </div>

          <div>
            <div className="tips-title">{tip.title}</div>
            <div className="tips-desc">{tip.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}