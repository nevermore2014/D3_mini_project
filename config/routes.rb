MiniProject::Application.routes.draw do
  get "lines/index"
  get "crimes/index"
  root "crimes#index"
end
