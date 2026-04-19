"use client";

import { useState } from "react";
import { Save, Bell, Lock, Palette, Globe, Mail } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "GoodTesting",
    adminEmail: "admin@goodtesting.uz",
    telegramBotToken: "",
    telegramChatId: "",
    currency: "USD",
    language: "en",
    notifications: true,
    twoFactorAuth: false,
  });

  const handleSave = () => {
    console.log("Saving settings:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">
          Configure system settings and preferences
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="space-y-6">
          {/* General Settings */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-500" />
              General Settings
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, adminEmail: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) =>
                    setSettings({ ...settings, currency: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>UZS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) =>
                    setSettings({ ...settings, language: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="en">English</option>
                  <option value="uz">Uzbek</option>
                  <option value="ru">Russian</option>
                </select>
              </div>
            </div>
          </div>

          {/* Telegram Settings */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-500" />
              Telegram Integration
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bot Token
                </label>
                <input
                  type="password"
                  value={settings.telegramBotToken}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      telegramBotToken: e.target.value,
                    })
                  }
                  placeholder="Enter your bot token"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Chat ID
                </label>
                <input
                  type="text"
                  value={settings.telegramChatId}
                  onChange={(e) =>
                    setSettings({ ...settings, telegramChatId: e.target.value })
                  }
                  placeholder="Enter admin chat ID"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-gray-500" />
              Security
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      twoFactorAuth: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-red-600 rounded"
                />
                <span className="text-sm text-gray-700">
                  Enable Two-Factor Authentication
                </span>
              </label>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-500" />
              Notifications
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-red-600 rounded"
                />
                <span className="text-sm text-gray-700">
                  Email notifications for new orders
                </span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t pt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
