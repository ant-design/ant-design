from kivy.app import App
from kivy.uix.label import Label
from kivy.uix.boxlayout import BoxLayout
from kivy.core.window import Window

class TransparentScreenApp(App):
    def build(self):
        # القيمة الافتراضية لشفافية الشاشة
        self.alpha_value = 0.5
        
        # ضبط الشفافية بالقيمة الافتراضية
        Window.clearcolor = (1, 1, 1, self.alpha_value)
        
        # إنشاء واجهة المستخدم
        layout = BoxLayout(orientation='vertical')
        label = Label(text='مرحباً بك في تطبيق شفاف!', font_size='24sp')
        layout.add_widget(label)
        return layout

    def on_stop(self):
        # حفظ قيمة شفافية الشاشة عند إغلاق التطبيق
        with open('alpha_value.txt', 'w') as f:
            f.write(str(self.alpha_value))

if __name__ == '__main__':
    TransparentScreenApp().run()