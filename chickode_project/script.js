// 간단한 랜덤 문제/힌트 데이터
const PROBLEMS = [
  {
    chapter: "[Chapter 1: 코드 기초 (Variables)]",
    text:
      "미션: 변수 'my_name'에 당신의 이름을 문자열로 저장하고, 변수 'my_age'에 당신의 나이를 정수로 저장한 뒤 두 값을 모두 출력하세요.",
    hints: [
      "[힌트 1] 문자열은 따옴표(\" \" 또는 ' ')로 감싸요.",
      "[힌트 2] 숫자는 따옴표 없이 바로 적어요.",
      "[힌트 3] 값을 보여주고 싶을 때는 print(변수이름)을 사용해요."
    ]
  },
  {
    chapter: "[Chapter 1: 코드 기초 (Variables)]",
    text:
      "미션: 변수 'city'에 당신이 살고 있는 도시 이름을, 변수 'year'에 올해 연도를 저장하고 두 변수를 한 줄씩 출력하세요.",
    hints: [
      "[힌트 1] 한글도 문자열로 저장할 수 있어요. 예: city = \"서울\"",
      "[힌트 2] year 처럼 숫자는 따옴표 없이 저장해요.",
      "[hint 3] print(city), print(year) 처럼 한 줄씩 출력해 보세요."
    ]
  },
  {
    chapter: "[Chapter 1: 코드 기초 (Variables)]",
    text:
      "미션: 변수 'language'에 'Python'을, 변수 'level'에 당신의 난이도(예: 1)를 저장하고, '지금은 Python 1단계!' 문장을 출력하도록 코드를 작성하세요.",
    hints: [
      "[힌트 1] 문자열끼리 더하기로 문장을 만들 수 있어요.",
      "[힌트 2] 숫자를 문자열로 바꿀 땐 str(숫자)를 사용해요.",
      "[힌트 3] 예: print(\"지금은 \" + language + \" \" + str(level) + \"단계!\")"
    ]
  }
];

function pickRandomProblem() {
  const index = Math.floor(Math.random() * PROBLEMS.length);
  return PROBLEMS[index];
}

function renderProblem(problem) {
  const problemTextEl = document.getElementById("problem-text");
  const hintListEl = document.getElementById("hint-list");
  const chapterLabelEl = document.getElementById("chapter-label");

  if (!problemTextEl || !hintListEl) return;

  problemTextEl.textContent = problem.text;

  if (chapterLabelEl) {
    chapterLabelEl.textContent = problem.chapter;
  }

  // 힌트 목록 비우고 다시 채우기(잠금 상태로 시작)
  while (hintListEl.firstChild) {
    hintListEl.removeChild(hintListEl.firstChild);
  }

  const revealed = new Array(problem.hints.length).fill(false);

  const renderHintList = () => {
    while (hintListEl.firstChild) {
      hintListEl.removeChild(hintListEl.firstChild);
    }

    problem.hints.forEach((hint, idx) => {
      const li = document.createElement("li");
      li.className = "hintItem";

      if (revealed[idx]) {
        li.textContent = hint;
        hintListEl.appendChild(li);
        return;
      }

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hintReveal";
      btn.setAttribute("aria-expanded", "false");
      btn.textContent = `🔒 힌트 ${idx + 1} 열기`;
      btn.addEventListener("click", () => {
        revealed[idx] = true;
        renderHintList();
      });

      li.appendChild(btn);
      hintListEl.appendChild(li);
    });
  };

  renderHintList();

  // 문제 텍스트가 바뀌면 에디터 기본 템플릿도 살짝 초기화(선택 사항)
  const editor = document.getElementById("code-editor");
  if (editor && typeof editor.value === "string") {
    editor.value = `def print_info():\n    # 여기에 코드를 작성해보세요\n    \n`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("problem-text")) {
    // 첫 로딩 시 문제 하나 보여주기
    renderProblem(pickRandomProblem());

    const nextBtn = document.getElementById("next-problem");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        renderProblem(pickRandomProblem());
      });
    }

    const submitBtn = document.getElementById("submit-code");
    const submitMessage = document.getElementById("submit-message");
    const editor = document.getElementById("code-editor");

    if (submitBtn && submitMessage && editor) {
      submitBtn.addEventListener("click", () => {
        // 실제 채점은 아직 없고, 피드백 메시지만 표시
        submitMessage.textContent =
          "코드가 제출되었어요! 곧 AI 튜터가 코드를 확인해 줄 거예요.";
      });
    }
  }
});
