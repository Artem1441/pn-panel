import { useAppDispatch } from "@/hooks/useAppDispatch";
import { authSlice } from "@/store/reducers/auth.reducer";

const AuthSignUpAcquaintance = () => {
  const dispatch = useAppDispatch();
  const { setAuthStageAction } = authSlice.actions;

  const goNext = () => {
    dispatch(setAuthStageAction("identification data"));
  };

  return (
    <>
      <div className="page-container container-nopadding">
        <div className="page-content">
          <div className="content-wrapper">
            <div className="content">
              <div className="row">
                <div id="windowData" className="col-lg-12">
                  <div id="Gettoknow" className="panel panel-body login-form">
                    <div className="text-center">
                      <a href="/">
                        <img id="logo-img2" src="/images/logo2.png" alt="" />
                      </a>
                    </div>

                    <div className="text-center">
                      <h5>знакомство</h5>
                    </div>

                    <p>
                      Компания <span className="stressed-text">"PROНогти"</span>{" "}
                      - региональная сеть студий красоты, своей миссией мы хотим
                      сделать мир прекраснее, а особенно милых дам.
                      <span className="stressed-text">ООО "ПроНогти"</span> -
                      действует только в соответствии с действующим
                      законодательством, поэтому для того, чтобы начать с нами
                      сотрудничество, необходимо открыть самозанятость!
                    </p>

                    <p>
                      Преимущества получения официального дохода самозанятым при
                      сотрудничестве с нами:
                    </p>

                    <ul>
                      <li>возможность легально работать;</li>
                      <li>отличный кредитный рейтинг;</li>
                      <li>
                        не нужно отчитываться за крупные покупки перед
                        налоговыми органами;
                      </li>
                      <li>прозрачное движение денежных средств;</li>
                      <li>отсутствие отчетности и деклараций;</li>
                      <li>
                        самая низкая ставка налога в РФ и половину налога (3%)
                        мы дополнительно компенсируем;
                      </li>
                      <li>регулярные поступления (каждые 2 недели).</li>
                      <li>множество клиентов без лишних забот!</li>
                    </ul>

                    <p>
                      Узнать больше о самозанятости, а так же о том, как
                      зарегистрироваться и открыть расчетный счёт, Вы можете
                      пройдя по ссылкам банков:
                    </p>

                    <ul>
                      <li>
                        <a href="https://allo.tochka.com/samozanyatye">
                          Точка Банк (Открытие);
                        </a>
                      </li>
                      <li>
                        <a href="https://www.tinkoff.ru/business/help/business-self-employment/self-employed/work/start">
                          Тинькофф;
                        </a>
                      </li>
                      <li>
                        <a href="https://www.sberbank.com/ru/svoedelo/start">
                          Сбер.
                        </a>
                      </li>
                    </ul>
                    <p>
                      Если Вы зарегистрировались в качестве самозанятого и
                      открыли расчетный счёт, то переходите к регистрации в
                      системе <span className="stressed-text">PROНогти</span>:
                    </p>
                    <button onClick={goNext}>Начать регистрацию</button>
                  </div>
                </div>
              </div>
              <div className="footer text-muted text-center">
                2023. <a href="/"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="users-device-size">
        <div id="sm" className="visible-sm"></div>
        <div id="md" className="visible-md"></div>
        <div id="lg" className="visible-lg"></div>
      </div>
    </>
  );
};

export default AuthSignUpAcquaintance;
